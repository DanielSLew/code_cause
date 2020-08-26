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
    tag: "description",
    frames: [
      {
        type: "message",
        title: "Starting a Project on Code Cause",
        subTitle: "Here's what you need to know",
        body: {
          type: "list",
          strings: [
            // "Code Cause is a community of builders and creators",
            "Your job is to post open source projects ideas to CodeCause",
            "What this means is that no one owns the project, anyone is free to use it",
            "Builders (developers, designers, etc) search for projects that inspire them and join up",
            "You'll want to make your requests as easy to understand as possible",
            "Together you'll work on the project through stages until it's completed",
            "The problems can be small -- maybe you need to figure out a way to get consistent data from a database",
            "The problems can be big -- maybe you want to build a platform to help frontline workers",
            "When you create a project you'll be able to add people to help you with the ideas, and you'll be able to add people to help with turning your ideas into reality",
            "Click the \"?\" at the bottom of the screen at any time to get clarification",
            "We'll do our best to walk you through these steps to make your project as concise as possible",
            "Submit feedback to any of the steps at the bottom so we can know how to improve",
            // "Creators and Builders gain karma for finished work",
            // "Karma is used to upvote projects to the top of the listing",
            // "Also, the more karma attatched to a project, the more people gain by finishing it",
          ],
        },
      },
      {
        type: "singleQA",
        title: "The Pitch",
        question: "Tell us about your project idea, What's the elevator pitch?",
        tag: "description",
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
    ],
  },
  {
    tag: "Q2",
    frames: [
      // {
      //   type: "message",
      //   title: "Sounds Great!",
      //   subTitle: "Here's a few things to consider before sharing your idea.",
      //   body: {
      //     type: "list",
      //     strings: [
      //       "Code Cause is generally for non-profit/open source projects.",
      //       "While for-profits are welcome, we currently have no way of enforcing or arbitrating agreements.",
      //       "When you post your project idea to the world, it's out there, and anyone can now use it.",
      //       "Which means Code Cause is better suited (at the moment) for projects that need to be made for some altruistic benefit as opossed to starting a business.",
      //       "The best projects have creators that bring energy, creativity, and a solid vision to the table.",
      //       "So make sure you have enough time to direct the project from begininning to completion",
      //       "And remember that the best form of leadership is from those who lead from the front. Be ready to help your team in any way you can.",
      //     ],
      //   },
      // },
      {
        type: "singleQA",
        title: "The Solution",
        question: "What ideas do you have about solving this problem?",
        details:
          "Keep your solutions short and simple. If you don't have any ideas on how to solve this yet, that's ok.",
        tag: "Q2",
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
    tag: "Q3",
    frames: [
      {
        type: "singleQA",
        title: "The Helpers",
        question: "What do you need from a contributor?",
        details:
          "Try to be as specific as possible, feel free to skip this step if you are unsure.",
        help: "Some examples: you may need database help, a mobile app, a website, etc.",
        tag: "Q3",
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
    tag: "Q4",
    frames: [
      {
        type: "singleQA",
        title: "Your Experience (TODO: RADIO OUTPUT FROM 1-10?)",
        question: "What kind of experience do you have working with developers?",
        details:
          "It's ok if you don't have any experience, it helps the contributors know what to expect from you.",
        help: "1 would mean you don't know any of the language developers use, 10 would be mean you can contribute no problem with developer jargon.",
        tag: "Q4",
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
    tag: "Q5",
    frames: [
      {
        type: "singleQA",
        title: "The Finished Project",
        question: "What will your project look like when it's finished?",
        details:
          "What all needs to be there for you to consider your project to be completed.",
        help: "This helps us get an idea of an endpoint to your project. Some projects could also have multiple endpoints.",
        tag: "Q5",
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
    tag: "name",
    frames: [
      {
        type: "singleQA",
        title: "The Name",
        question: "What do you want to call your project?",
        details:
          "Write something descriptive that will catch someone's eye.",
        help: "Try to think of something better than Jane Doe's Project!",
        tag: "name",
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
    tag: "Q7",
    frames: [
      {
        type: "singleQA",
        title: "The Extra Details",
        question: "Is there anything else you want to include that you haven't already?",
        details:
          "Here is where you can run wild and add anything else you think someone will want to know if they're helping with this project.",
        help: "This helps us get an idea of an endpoint to your project. Some projects could also have multiple endpoints.",
        tag: "Q7",
        input: {
          type: "textBox",
          validation: [
            { type: "not-empty", response: "Please type in a response" },
          ],
        },
      },
      {
        type: "results",
        title: "Your Project",
        question: "Does all this look ok?",
        details: "Check everything over to make sure you have everything down.",
      },
    ],
  },
  // {
  //   tag: "result",
  //   frames: [
  //     {
  //       type: "results",
  //       title: "Your Project",
  //       questions: "Does all this look ok?",
  //       details: "Check everything over to make sure you have everything down.",
  //       tag: "result",
  //     },
  //   ],
  // },
];
