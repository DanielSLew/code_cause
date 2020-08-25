const onlyQAFrames = (steps) => {
  return steps.map((step) => {
    return {
      tag: step.tag,
      QA: step.frames.find((frame) => frame.tag),
    };
  });
};
const mapSingleQA = (step) => {
  const { type, question, title } = step.QA;
  return {
    tag: step.tag,
    type,
    question,
    answer: "",
    completed: false,
  };
};
const mapMultiQA = (step) => {
  const { type, questions } = step.QA;
  return {
    tag: step.tag,
    type,
    questions,
    answers: questions.map((question) => ""),
    completed: false,
  };
};

export const createStepperData = (instructions) => {
  if (!instructions) throw "Did not recieve valid instructions";
  const stepData = onlyQAFrames(instructions);
  return stepData.map((step) => {
    if (step.QA.type === "singleQA") return mapSingleQA(step);
    if (step.QA.type === "multiQA") return mapMultiQA(step);
    else {
      throw "Step doesn't have a valid QA frame";
    }
  });
};

export const instructions = [
  {
    tag: "Q0",
    frames: [
      {
        type: "message",
        title: "Starting a Project on Code Cause",
        subTitle: "Here's what you need to know",
        body: {
          type: "list",
          strings: [
            "Code Cause is a community of builders and creators",
            "Creators post open source projects ideas to CodeCause",
            "Builders (developers, designers, etc) search for projects that inspire them and join up",
            "Together they work on the project through stages until it's completed",
            "(Future Idea)",
            "Creators and Builders gain karma for finished work",
            "Karma is used to upvote projects to the top of the listing",
            "Also, the more karma attatched to a project, the more people gain by finishing it",
          ],
        },
      },
      {
        type: "singleQA",
        title: "Tell us About your Project Idea",
        question: "What's the elevator pitch?",
        tag: "Q0",
        details:
          "Try to sum the project up in one sentence. If you can't, odds are the idea is too complex and needs to be refined. Take your time to get to the core of what your project is. ",
        help:
          "An elevator pitch is a one-liner pitch that describes your idea in a hurry, as if you were trying to explain your idea to someone important while sharing an elevator ride.",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
    ],
  },
  {
    tag: "Q1",
    frames: [
      {
        type: "message",
        title: "Sounds Great!",
        subTitle: "Here's a few things to consider before sharing your idea.",
        body: {
          type: "list",
          strings: [
            "Code Cause is generally for non-profit/open source projects.",
            "While for-profits are welcome, we currently have no way of enforcing or arbitrating agreements.",
            "When you post your project idea to the world, it's out there, and anyone can now use it.",
            "Which means Code Cause is better suited (at the moment) for projects that need to be made for some altruistic benefit as opossed to starting a business.",
            "The best projects have creators that bring energy, creativity, and a solid vision to the table.",
            "So make sure you have enough time to direct the project from begininning to completion",
            "And remember that the best form of leadership is from those who lead from the front. Be ready to help your team in any way you can.",
          ],
        },
      },
      {
        type: "singleQA",
        title: "The Problem",
        question: "What problem is your project going to solve.",
        details:
          "Give some detail, but don't go longer than a paragraph. We can get into the hard details later.",
        tag: "Q1",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
      {
        type: "results",
        title: "Results",
      },
    ],
  },
];
