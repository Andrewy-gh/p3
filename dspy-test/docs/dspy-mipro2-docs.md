[ Skip to content ](https://dspy.ai/api/optimizers/MIPROv2/#dspymiprov2)
# dspy.MIPROv2[¶](https://dspy.ai/api/optimizers/MIPROv2/#dspymiprov2 "Permanent link")
`MIPROv2` (_M_ ultiprompt _I_ nstruction _PR_ oposal _O_ ptimizer Version 2) is an prompt optimizer capable of optimizing both instructions and few-shot examples jointly. It does this by bootstrapping few-shot example candidates, proposing instructions grounded in different dynamics of the task, and finding an optimized combination of these options using Bayesian Optimization. It can be used for optimizing few-shot examples & instructions jointly, or just instructions for 0-shot optimization.
##  `dspy.MIPROv2(metric: Callable, prompt_model: Any | None = None, task_model: Any | None = None, teacher_settings: dict | None = None, max_bootstrapped_demos: int = 4, max_labeled_demos: int = 4, auto: Literal['light', 'medium', 'heavy'] | None = 'light', num_candidates: int | None = None, num_threads: int | None = None, max_errors: int | None = None, seed: int = 9, init_temperature: float = 1.0, verbose: bool = False, track_stats: bool = True, log_dir: str | None = None, metric_threshold: float | None = None)` [¶](https://dspy.ai/api/optimizers/MIPROv2/#dspy.MIPROv2 "Permanent link")
Bases: `Teleprompter`
Source code in `dspy/teleprompt/mipro_optimizer_v2.py`
```
48[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-48)
49[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-49)
50[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-50)
51[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-51)
52[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-52)
53[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-53)
54[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-54)
55[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-55)
56[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-56)
57[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-57)
58[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-58)
59[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-59)
60[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-60)
61[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-61)
62[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-62)
63[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-63)
64[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-64)
65[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-65)
66[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-66)
67[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-67)
68[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-68)
69[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-69)
70[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-70)
71[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-71)
72[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-72)
73[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-73)
74[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-74)
75[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-75)
76[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-76)
77[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-77)
78[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-78)
79[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-79)
80[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-80)
81[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-81)
82[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-82)
83[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-83)
84[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-84)
85[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-85)
86[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-86)
87[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-87)
88[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-88)
89[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-89)
90[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-90)
91[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-91)
92[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-92)
93[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-93)
94[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-94)
```
| ```
def__init__(
  self,
  metric: Callable,
  prompt_model: Any | None = None,
  task_model: Any | None = None,
  teacher_settings: dict | None = None,
  max_bootstrapped_demos: int = 4,
  max_labeled_demos: int = 4,
  auto: Literal["light", "medium", "heavy"] | None = "light",
  num_candidates: int | None = None,
  num_threads: int | None = None,
  max_errors: int | None = None,
  seed: int = 9,
  init_temperature: float = 1.0,
  verbose: bool = False,
  track_stats: bool = True,
  log_dir: str | None = None,
  metric_threshold: float | None = None,
):
  # Validate 'auto' parameter
  allowed_modes = {None, "light", "medium", "heavy"}
  if auto not in allowed_modes:
    raise ValueError(f"Invalid value for auto: {auto}. Must be one of {allowed_modes}.")
  self.auto = auto
  self.num_fewshot_candidates = num_candidates
  self.num_instruct_candidates = num_candidates
  self.num_candidates = num_candidates
  self.metric = metric
  self.init_temperature = init_temperature
  self.task_model = task_model if task_model else dspy.settings.lm
  self.prompt_model = prompt_model if prompt_model else dspy.settings.lm
  self.max_bootstrapped_demos = max_bootstrapped_demos
  self.max_labeled_demos = max_labeled_demos
  self.verbose = verbose
  self.track_stats = track_stats
  self.log_dir = log_dir
  self.teacher_settings = teacher_settings or {}
  self.prompt_model_total_calls = 0
  self.total_calls = 0
  self.num_threads = num_threads
  self.max_errors = max_errors
  self.metric_threshold = metric_threshold
  self.seed = seed
  self.rng = None
  if not self.prompt_model or not self.task_model:
    raise ValueError("Either provide both prompt_model and task_model or set a default LM through dspy.configure(lm=...)")

```
  
---|---  
### Functions[¶](https://dspy.ai/api/optimizers/MIPROv2/#dspy.MIPROv2-functions "Permanent link")
####  `compile(student: Any, *, trainset: list, teacher: Any = None, valset: list | None = None, num_trials: int | None = None, max_bootstrapped_demos: int | None = None, max_labeled_demos: int | None = None, seed: int | None = None, minibatch: bool = True, minibatch_size: int = 35, minibatch_full_eval_steps: int = 5, program_aware_proposer: bool = True, data_aware_proposer: bool = True, view_data_batch_size: int = 10, tip_aware_proposer: bool = True, fewshot_aware_proposer: bool = True, requires_permission_to_run: bool | None = None, provide_traceback: bool | None = None) -> Any` [¶](https://dspy.ai/api/optimizers/MIPROv2/#dspy.MIPROv2.compile "Permanent link")
Source code in `dspy/teleprompt/mipro_optimizer_v2.py`
```
 96[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-96)
 97[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-97)
 98[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-98)
 99[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-99)
100[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-100)
101[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-101)
102[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-102)
103[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-103)
104[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-104)
105[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-105)
106[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-106)
107[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-107)
108[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-108)
109[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-109)
110[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-110)
111[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-111)
112[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-112)
113[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-113)
114[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-114)
115[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-115)
116[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-116)
117[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-117)
118[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-118)
119[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-119)
120[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-120)
121[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-121)
122[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-122)
123[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-123)
124[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-124)
125[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-125)
126[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-126)
127[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-127)
128[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-128)
129[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-129)
130[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-130)
131[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-131)
132[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-132)
133[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-133)
134[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-134)
135[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-135)
136[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-136)
137[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-137)
138[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-138)
139[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-139)
140[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-140)
141[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-141)
142[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-142)
143[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-143)
144[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-144)
145[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-145)
146[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-146)
147[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-147)
148[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-148)
149[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-149)
150[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-150)
151[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-151)
152[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-152)
153[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-153)
154[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-154)
155[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-155)
156[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-156)
157[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-157)
158[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-158)
159[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-159)
160[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-160)
161[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-161)
162[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-162)
163[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-163)
164[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-164)
165[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-165)
166[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-166)
167[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-167)
168[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-168)
169[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-169)
170[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-170)
171[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-171)
172[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-172)
173[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-173)
174[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-174)
175[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-175)
176[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-176)
177[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-177)
178[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-178)
179[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-179)
180[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-180)
181[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-181)
182[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-182)
183[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-183)
184[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-184)
185[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-185)
186[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-186)
187[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-187)
188[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-188)
189[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-189)
190[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-190)
191[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-191)
192[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-192)
193[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-193)
194[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-194)
195[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-195)
196[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-196)
197[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-197)
198[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-198)
199[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-199)
200[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-200)
201[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-201)
202[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-202)
203[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-203)
204[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-204)
205[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-205)
206[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-206)
207[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-207)
208[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-208)
209[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-209)
210[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-210)
211[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-211)
212[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-212)
213[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-213)
214[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-214)
215[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-215)
216[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-216)
217[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-217)
218[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-218)
219[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-219)
```
| ```
defcompile(
  self,
  student: Any,
  *,
  trainset: list,
  teacher: Any = None,
  valset: list | None = None,
  num_trials: int | None = None,
  max_bootstrapped_demos: int | None = None,
  max_labeled_demos: int | None = None,
  seed: int | None = None,
  minibatch: bool = True,
  minibatch_size: int = 35,
  minibatch_full_eval_steps: int = 5,
  program_aware_proposer: bool = True,
  data_aware_proposer: bool = True,
  view_data_batch_size: int = 10,
  tip_aware_proposer: bool = True,
  fewshot_aware_proposer: bool = True,
  requires_permission_to_run: bool | None = None, # deprecated
  provide_traceback: bool | None = None,
) -> Any:
  if requires_permission_to_run == False:
    logger.warning(
      "'requires_permission_to_run' is deprecated and will be removed in a future version."
    )
  elif requires_permission_to_run == True:
    raise ValueError("User confirmation is removed from MIPROv2. Please remove the 'requires_permission_to_run' argument.")
  effective_max_errors = (
    self.max_errors
    if self.max_errors is not None
    else dspy.settings.max_errors
  )
  zeroshot_opt = (self.max_bootstrapped_demos == 0) and (self.max_labeled_demos == 0)
  # If auto is None, and num_trials is not provided (but num_candidates is), raise an error that suggests a good num_trials value
  if self.auto is None and (self.num_candidates is not None and num_trials is None):
    raise ValueError(
      f"If auto is None, num_trials must also be provided. Given num_candidates={self.num_candidates}, we'd recommend setting num_trials to ~{self._set_num_trials_from_num_candidates(student,zeroshot_opt,self.num_candidates)}."
    )
  # If auto is None, and num_candidates or num_trials is None, raise an error
  if self.auto is None and (self.num_candidates is None or num_trials is None):
    raise ValueError("If auto is None, num_candidates must also be provided.")
  # If auto is provided, and either num_candidates or num_trials is not None, raise an error
  if self.auto is not None and (self.num_candidates is not None or num_trials is not None):
    raise ValueError(
      "If auto is not None, num_candidates and num_trials cannot be set, since they would be overridden by the auto settings. Please either set auto to None, or do not specify num_candidates and num_trials."
    )
  # Set random seeds
  seed = seed or self.seed
  self._set_random_seeds(seed)
  # Update max demos if specified
  if max_bootstrapped_demos is not None:
    self.max_bootstrapped_demos = max_bootstrapped_demos
  if max_labeled_demos is not None:
    self.max_labeled_demos = max_labeled_demos
  # Set training & validation sets
  trainset, valset = self._set_and_validate_datasets(trainset, valset)
  # Set hyperparameters based on run mode (if set)
  num_trials, valset, minibatch = self._set_hyperparams_from_run_mode(
    student, num_trials, minibatch, zeroshot_opt, valset
  )
  if self.auto:
    self._print_auto_run_settings(num_trials, minibatch, valset)
  if minibatch and minibatch_size > len(valset):
    raise ValueError(f"Minibatch size cannot exceed the size of the valset. Valset size: {len(valset)}.")
  # Initialize program and evaluator
  program = student.deepcopy()
  evaluate = Evaluate(
    devset=valset,
    metric=self.metric,
    num_threads=self.num_threads,
    max_errors=effective_max_errors,
    display_table=False,
    display_progress=True,
    provide_traceback=provide_traceback,
  )
  with dspy.context(lm=self.task_model):
    # Step 1: Bootstrap few-shot examples
    demo_candidates = self._bootstrap_fewshot_examples(program, trainset, seed, teacher)
  # Step 2: Propose instruction candidates
  instruction_candidates = self._propose_instructions(
    program,
    trainset,
    demo_candidates,
    view_data_batch_size,
    program_aware_proposer,
    data_aware_proposer,
    tip_aware_proposer,
    fewshot_aware_proposer,
  )
  # If zero-shot, discard demos
  if zeroshot_opt:
    demo_candidates = None
  with dspy.context(lm=self.task_model):
    # Step 3: Find optimal prompt parameters
    best_program = self._optimize_prompt_parameters(
      program,
      instruction_candidates,
      demo_candidates,
      evaluate,
      valset,
      num_trials,
      minibatch,
      minibatch_size,
      minibatch_full_eval_steps,
      seed,
    )
  return best_program

```
  
---|---  
####  `get_params() -> dict[str, Any]` [¶](https://dspy.ai/api/optimizers/MIPROv2/#dspy.MIPROv2.get_params "Permanent link")
Get the parameters of the teleprompter.
Returns:
Type | Description  
---|---  
`dict[str, Any]` |  The parameters of the teleprompter.  
Source code in `dspy/teleprompt/teleprompt.py`
```
25[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-25)
26[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-26)
27[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-27)
28[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-28)
29[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-29)
30[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-30)
31[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-31)
32[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-32)
```
| ```
defget_params(self) -> dict[str, Any]:
"""
  Get the parameters of the teleprompter.
  Returns:
    The parameters of the teleprompter.
  """
  return self.__dict__

```
  
---|---  
:::
## Example Usage[¶](https://dspy.ai/api/optimizers/MIPROv2/#example-usage "Permanent link")
The program below shows optimizing a math program with MIPROv2
```
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-1)importdspy
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-2)fromdspy.datasets.gsm8kimport GSM8K, gsm8k_metric
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-3)
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-4)# Import the optimizer
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-5)fromdspy.telepromptimport MIPROv2
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-6)
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-7)# Initialize the LM
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-8)lm = dspy.LM('openai/gpt-4o-mini', api_key='YOUR_OPENAI_API_KEY')
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-9)dspy.configure(lm=lm)
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-10)
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-11)# Initialize optimizer
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-12)teleprompter = MIPROv2(
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-13)  metric=gsm8k_metric,
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-14)  auto="medium", # Can choose between light, medium, and heavy optimization runs
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-15))
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-16)
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-17)# Optimize program
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-18)print(f"Optimizing program with MIPROv2...")
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-19)gsm8k = GSM8K()
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-20)optimized_program = teleprompter.compile(
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-21)  dspy.ChainOfThought("question -> answer"),
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-22)  trainset=gsm8k.train,
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-23))
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-24)
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-25)# Save optimize program for future use
[](https://dspy.ai/api/optimizers/MIPROv2/#__codelineno-0-26)optimized_program.save(f"optimized.json")

```

## How `MIPROv2` works[¶](https://dspy.ai/api/optimizers/MIPROv2/#how-miprov2-works "Permanent link")
At a high level, `MIPROv2` works by creating both few-shot examples and new instructions for each predictor in your LM program, and then searching over these using Bayesian Optimization to find the best combination of these variables for your program. If you want a visual explanation check out this .
These steps are broken down in more detail below:
1) **Bootstrap Few-Shot Examples** : Randomly samples examples from your training set, and run them through your LM program. If the output from the program is correct for this example, it is kept as a valid few-shot example candidate. Otherwise, we try another example until we've curated the specified amount of few-shot example candidates. This step creates `num_candidates` sets of `max_bootstrapped_demos` bootstrapped examples and `max_labeled_demos` basic examples sampled from the training set.
2) **Propose Instruction Candidates**. The instruction proposer includes (1) a generated summary of properties of the training dataset, (2) a generated summary of your LM program's code and the specific predictor that an instruction is being generated for, (3) the previously bootstrapped few-shot examples to show reference inputs / outputs for a given predictor and (4) a randomly sampled tip for generation (i.e. "be creative", "be concise", etc.) to help explore the feature space of potential instructions. This context is provided to a `prompt_model` which writes high quality instruction candidates.
3) **Find an Optimized Combination of Few-Shot Examples & Instructions**. Finally, we use Bayesian Optimization to choose which combinations of instructions and demonstrations work best for each predictor in our program. This works by running a series of `num_trials` trials, where a new set of prompts are evaluated over our validation set at each trial. The new set of prompts are only evaluated on a minibatch of size `minibatch_size` at each trial (when `minibatch`=`True`). The best averaging set of prompts is then evaluated on the full validation set every `minibatch_full_eval_steps`. At the end of the optimization process, the LM program with the set of prompts that performed best on the full validation set is returned.
For those interested in more details, more information on `MIPROv2` along with a study on `MIPROv2` compared with other DSPy optimizers can be found in .
Back to top 
