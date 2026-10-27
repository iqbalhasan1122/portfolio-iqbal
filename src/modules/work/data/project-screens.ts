export interface ProjectScreen { src: string; caption: string; width: number; height: number; mobile?: boolean }
export const projectScreens: Record<string, ProjectScreen[]> = {
  oxton: [{src:"/projects/oxton.png",width:1280,height:822,caption:"Workspace overview"},{src:"/projects/oxton-workflow.png",width:1000,height:642,caption:"Visual workflow builder"}],
  tandem: [{src:"/projects/tandem.png",width:1280,height:1064,caption:"Workspace overview"},{src:"/projects/tandem-board.png",width:1000,height:863,caption:"Tasks in board view"}],
  "spirit-wise": [{src:"/projects/spirit-wise.png",width:320,height:693,caption:"Welcome",mobile:true},{src:"/projects/spirit-wise-start.png",width:320,height:693,caption:"Getting started",mobile:true},{src:"/projects/spirit-wise-account.png",width:320,height:693,caption:"Create an account",mobile:true}],
  "play-tennis": [{src:"/projects/play-tennis.png",width:640,height:362,caption:"Coaching website introduction"},{src:"/projects/play-tennis-trainers.png",width:640,height:395,caption:"Meet the trainers"}],
  "plant-zone": [{src:"/projects/plant-zone.png",width:1280,height:744,caption:"Storefront introduction"},{src:"/projects/plant-zone-products.png",width:640,height:398,caption:"Plant store design"}],
  "mojo-blend": [{src:"/projects/mojo-blend.png",width:1280,height:813,caption:"Visual identity presentation"},{src:"/projects/mojo-blend-details.png",width:1000,height:647,caption:"Identity details"}]
};
