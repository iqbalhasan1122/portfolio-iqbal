import type { ImageKey } from '@/shared/assets/images';
export type ProjectCategory = 'Web' | 'Mobile' | 'Branding';
export interface Project { id:string;title:string;cat:ProjectCategory;tag:string;img:ImageKey;sum:string;role:string;dur:string;year:string;scope:string;ch:string;so:string;res:ReadonlyArray<readonly [string,string]> }
export const projects:Project[] = [
  {
    "id": "oxton",
    "title": "Oxton — Workflow Automation Platform",
    "cat": "Web",
    "tag": "Product design",
    "img": "oxton",
    "sum": "A structured workspace for automations, review queues and everyday operational decisions.",
    "role": "UI/UX Design",
    "dur": "Multi-screen product design",
    "year": "Design study",
    "scope": "Dashboard, workflows, component system",
    "ch": "Make a feature-rich automation workspace easier to navigate, with a clear hierarchy for activity, exceptions and tasks that need attention.",
    "so": "The design brings overview metrics, workflow activity and review tasks into a shared layout. Reusable navigation and components keep the experience consistent across the product.",
    "res": [
      [
        "UX",
        "Workspace and task flows"
      ],
      [
        "UI",
        "Product dashboard screens"
      ],
      [
        "Figma",
        "Reusable interface components"
      ]
    ]
  },
  {
    "id": "tandem",
    "title": "Tandem — Team Workspace",
    "cat": "Web",
    "tag": "Product design",
    "img": "tandem",
    "sum": "A connected workspace for tasks, projects and team activity, with a focused dark interface.",
    "role": "UI/UX Design",
    "dur": "Multi-screen product design",
    "year": "Design study",
    "scope": "Task management, overview, responsive UI",
    "ch": "Bring daily priorities, project progress and team activity into one readable workspace without overwhelming the person using it.",
    "so": "The interface groups related information into a calm overview, with dedicated task views and consistent navigation. Status colours and clear labels make the next action easier to find.",
    "res": [
      [
        "UX",
        "Task and project journeys"
      ],
      [
        "UI",
        "Connected workspace screens"
      ],
      [
        "System",
        "Consistent interaction patterns"
      ]
    ]
  },
  {
    "id": "spirit-wise",
    "title": "Spirit Wise — Mobile Advisor Experience",
    "cat": "Mobile",
    "tag": "Mobile app design",
    "img": "spiritWise",
    "sum": "An approachable mobile introduction to discovering and connecting with spiritual advisors.",
    "role": "Mobile UI/UX Design",
    "dur": "Mobile experience design",
    "year": "Design study",
    "scope": "Onboarding, account flows, visual direction",
    "ch": "Introduce a personal advisory service clearly and help new users understand the available ways to connect before creating an account.",
    "so": "The mobile design combines a welcoming visual direction, clear service benefits and simple account actions. A consistent hierarchy supports the first steps into the app.",
    "res": [
      [
        "Mobile",
        "App interface design"
      ],
      [
        "UX",
        "Onboarding and account entry"
      ],
      [
        "Visual",
        "Cohesive mobile direction"
      ]
    ]
  },
  {
    "id": "play-tennis",
    "title": "Play Tennis — Coaching Website",
    "cat": "Web",
    "tag": "Website design",
    "img": "playTennis",
    "sum": "A confident coaching website that introduces programmes, trainers and the path to a first session.",
    "role": "Website UI/UX Design",
    "dur": "Website design",
    "year": "Design study",
    "scope": "Landing page, content hierarchy, responsive design",
    "ch": "Give a sports coaching service a clear, energetic introduction while helping visitors understand the programmes and choose their next step.",
    "so": "The design pairs real sports imagery with a strong headline, clear calls to action and a structured programme story. Trainer, membership and testimonial sections build context as visitors explore.",
    "res": [
      [
        "Web",
        "Marketing website design"
      ],
      [
        "UX",
        "Programme and inquiry paths"
      ],
      [
        "UI",
        "Responsive visual hierarchy"
      ]
    ]
  },
  {
    "id": "plant-zone",
    "title": "Plant Zone — Plant Store Website",
    "cat": "Web",
    "tag": "Commerce design",
    "img": "plantZone",
    "sum": "A fresh storefront concept that gives plants, care information and shopping actions room to breathe.",
    "role": "Website UI/UX Design",
    "dur": "Commerce website design",
    "year": "Design study",
    "scope": "Storefront, visual hierarchy, product presentation",
    "ch": "Create an inviting introduction to an indoor plant store, balancing an expressive visual style with useful plant-care information.",
    "so": "The design uses generous space, natural imagery and a restrained green palette. Clear shopping actions sit alongside care details that help visitors understand the product.",
    "res": [
      [
        "Web",
        "Storefront concept"
      ],
      [
        "UI",
        "Product-focused hierarchy"
      ],
      [
        "Brand",
        "Natural visual direction"
      ]
    ]
  },
  {
    "id": "mojo-blend",
    "title": "MojoBlend — Visual Identity",
    "cat": "Branding",
    "tag": "Brand design",
    "img": "mojoBlend",
    "sum": "An expressive visual identity exploration connecting colour, typography and digital brand applications.",
    "role": "Brand & Visual Design",
    "dur": "Identity exploration",
    "year": "Design study",
    "scope": "Brand direction, typography, digital applications",
    "ch": "Build a memorable visual language that feels connected across a brand presentation and its digital touchpoints.",
    "so": "The identity exploration combines distinctive typography, a purposeful palette and a repeatable graphic language. The presentation shows how those elements work together in practical applications.",
    "res": [
      [
        "Brand",
        "Visual identity direction"
      ],
      [
        "Type",
        "Typography and colour"
      ],
      [
        "Digital",
        "Brand applications"
      ]
    ]
  }
];
export const projectCategories = ['All','Web','Mobile','Branding'] as const;
export const getProject=(id:string)=>projects.find(p=>p.id===id);
