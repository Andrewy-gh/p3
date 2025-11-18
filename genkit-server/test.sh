#!/bin/bash

# Genkit Chat Server Test Suite
# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SERVER_URL="http://localhost:3400"
PASSED=0
FAILED=0

echo "=================================="
echo "Genkit Chat Server Test Suite"
echo "=================================="
echo ""

# Function to print test results
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
        ((FAILED++))
    fi
}

# Function to check if server is running
check_server() {
    response=$(curl -s -o /dev/null -w "%{http_code}" "$SERVER_URL/health")
    if [ "$response" -eq 200 ]; then
        return 0
    else
        return 1
    fi
}

# Test 1: Health Check
echo "Test 1: Health Check"
response=$(curl -s "$SERVER_URL/health")
if echo "$response" | grep -q "\"status\":\"ok\""; then
    print_result 0 "Health check returned OK"
else
    print_result 1 "Health check failed"
fi
echo ""

# Test 2: Basic Chat
echo "Test 2: Basic Chat"
response=$(curl -s -X POST "$SERVER_URL/chatFlow" \
    -H "Content-Type: application/json" \
    -d "{\"data\": {\"message\": \"What are the benefits of strength training?\"}}")
if echo "$response" | grep -q "\"result\""; then
    print_result 0 "Basic chat response received"
else
    print_result 1 "Basic chat failed"
    echo "Response: $response"
fi
echo ""

# Test 3: Workout Generation (Tool Calling)
echo "Test 3: Workout Generation (Tool Calling)"
response=$(curl -s -X POST "$SERVER_URL/chatFlow" \
    -H "Content-Type: application/json" \
    -d "{\"data\": {\"message\": \"I'm a beginner. I want a 30-minute full body workout at home with no equipment for general fitness. No injuries.\"}}")
if echo "$response" | grep -q "\"result\""; then
    # Check if response contains either tool output OR a workout plan
    if echo "$response" | grep -q "\"hasToolOutput\":true\|exercises\|workout"; then
        print_result 0 "Workout generation succeeded"
    else
        print_result 1 "Workout generation did not produce expected output"
        echo "Response: $response"
    fi
else
    print_result 1 "Workout generation failed"
    echo "Response: $response"
fi
echo ""

# Test 4: Conversation History
echo "Test 4: Conversation History"
response=$(curl -s -X POST "$SERVER_URL/chatFlow" \
    -H "Content-Type: application/json" \
    -d "{\"data\": {\"message\": \"Can you increase the duration?\", \"conversationHistory\": [{\"role\": \"user\", \"content\": \"I want a 30-minute beginner workout\"}, {\"role\": \"model\", \"content\": \"I need more details...\"}]}}")
if echo "$response" | grep -q "\"result\""; then
    print_result 0 "Conversation history handling succeeded"
else
    print_result 1 "Conversation history handling failed"
    echo "Response: $response"
fi
echo ""

# Test 5: Rate Limiting
echo "Test 5: Rate Limiting (sending 12 requests)"
rate_limit_passed=false
for i in {1..12}; do
    status_code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$SERVER_URL/chatFlow" \
        -H "Content-Type: application/json" \
        -d "{\"data\": {\"message\": \"Test $i\"}}")

    if [ $i -gt 10 ] && [ "$status_code" -eq 429 ]; then
        rate_limit_passed=true
        break
    fi
    sleep 0.1
done

if [ "$rate_limit_passed" = true ]; then
    print_result 0 "Rate limiting (10 req/min) working correctly"
else
    print_result 1 "Rate limiting not working as expected"
fi
echo ""

# Wait for rate limit to reset
echo "Waiting 60 seconds for rate limit to reset..."
sleep 60
echo ""

# Test 6: Error Handling - Empty Message
echo "Test 6: Error Handling - Empty Message"
response=$(curl -s -X POST "$SERVER_URL/chatFlow" \
    -H "Content-Type: application/json" \
    -d "{\"data\": {\"message\": \"\"}}")
if echo "$response" | grep -q "error\|cannot be empty"; then
    print_result 0 "Empty message error handling works"
else
    print_result 1 "Empty message error handling failed"
    echo "Response: $response"
fi
echo ""

# Test 7: Error Handling - Missing Message Field
echo "Test 7: Error Handling - Missing Message Field"
response=$(curl -s -X POST "$SERVER_URL/chatFlow" \
    -H "Content-Type: application/json" \
    -d "{\"data\": {}}")
if echo "$response" | grep -q "error\|required\|cannot be empty\|schema"; then
    print_result 0 "Missing message field error handling works"
else
    print_result 1 "Missing message field error handling failed"
    echo "Response: $response"
fi
echo ""

# Summary
echo "=================================="
echo "Test Summary"
echo "=================================="
echo -e "Total Tests: $((PASSED + FAILED))"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed.${NC}"
    exit 1
fi
