import react from "react";

const Version = {
  version: "1.0.1",
  patch: [
    {
      name: "home",
      patch: [
        {
          type: "fixed",
          patchDetails: [
            {
              details:
                "Further fixed an an issue where the home page didn't show properly on the moblie and lower height monitor.",
              description: null,
              major: false,
            },
            {
              details: "Fixed the background image animation.",
              description: null,
              major: false,
            },
            {
              details: "Fixed features section for mobile display.",
              description: null,
              major: false,
            },
          ],
        },
      ],
    },
    {
      name: "Signup",
      patch: [
        {
          type: "new",
          patchDetails: [
            {
              details: "New sign logic added (not OAUTH 2.0).",
              description: null,
            },
            {
              details: "New sign up page with different view and animation.",
              description: null,
              major: false,
            },
            {
              details: "Added a email verification with code.",
              description:
                "previously the email can be whatever the user wanted it to be but with the with the gmail verfication the email has to be a vaild gmail for the user to continue sign up.",
              major: true,
            },
          ],
        },
      ],
    },
    {
      name: "chat",
      patch: [
        {
          type: "new",
          patchDetails: [
            {
              details: "New background and chnage animation",
              description: null,
              major: false,
            },
          ],
        },
        {
          type: "change",
          patchDetails: [
            {
              details: "Removed the weather prompt",
              description: null,
              major: false,
            },
            {
              details: "Added and emoji button",
              description: null,
              major: false,
            },
          ],
        },
        {
          type: "fixed",
          patchDetails: [
            {
              details:
                "Fixed an an issue where friend bar overlaps on the moblie and lower height monitor",
              description: null,
              major: false,
            },
          ],
        },
      ],
    },
  ],
};
export default Version;
