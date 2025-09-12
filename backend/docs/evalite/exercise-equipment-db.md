> What is the exercise to equipment mapping database?

● The exercise-to-equipment mapping database is a data structure that maps each exercise to its minimum required
equipment. This is needed for the equipment feasibility checks in your evaluations.

Based on your eval guidelines, it would look something like this:

interface ExerciseMapping {
name: string;
minimalEquipment: string[];
spaceRequirement: 'minimal' | 'moderate' | 'large';
alternatives?: string[];
}

const exerciseDatabase: ExerciseMapping[] = [
{
name: "Barbell Bench Press",
minimalEquipment: ["barbell", "bench", "rack"],
spaceRequirement: "large",
alternatives: ["Dumbbell Bench Press", "Push-ups"]
},
{
name: "Pull-ups",
minimalEquipment: ["pull-up-bar"],
spaceRequirement: "moderate",
alternatives: ["Lat Pulldown", "Dumbbell Rows"]
},
{
name: "Dumbbell Rows",
minimalEquipment: ["dumbbells"],
spaceRequirement: "minimal"
},
{
name: "Push-ups",
minimalEquipment: ["bodyweight"],
spaceRequirement: "minimal"
}
// ... hundreds more exercises
];

This allows your eval tests to:

1. Validate equipment feasibility: Check if prescribed exercises match declared equipment
2. Test constraint scenarios: "dumbbells only" → should not include barbell exercises
3. Space validation: Hotel room → no large space requirements
4. Substitution logic: No bench → floor press instead of bench press

Your eval guidelines mention using "a small curated exercise-to-equipment map seeded from a public exercise list"

- you could source this from datasets like the exercises.json repository referenced in your guidelines.

The database would be used in your evalite scorers to automatically validate that every exercise in a generated
workout is feasible with the user's declared equipment and space constraints.
