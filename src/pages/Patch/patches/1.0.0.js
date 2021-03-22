import react from "react";

const Version = {
  version: "1.0.0",
  patch: [
    {
      name: "home",
      patch: [
        {
          type: "new",
          patchDetails: [
            {
              details: "New background and change animation",
              description: null,
              major: true,
            },
            { details: "New patch sections", description: null, major: false },
          ],
        },
        {
            type: "change",
          patchDetails: [
            {
              details: "Changed the navbar of the home page",
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
                "Fixed an an issue where the home page didn't show properly on the moblie and lower height monitor",
              description: null,
              major: false,
            },
            {
              details: "Fixed the patch section",
              description: null,
              major: false,
            },
          ],
        },
      ],
    },
    {
      name: "friends",
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
            { details: "Changed friend bar", description: null, major: false },
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
            {
              details:
                "Fixed where the accept and reject button overlap each other",
              description: null,
              major: false,
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
