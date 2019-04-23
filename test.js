#!/usr/bin/node
const termui = require("./index");
f = async function(){
    try{
        const val = await termui.createWindow({
            title: "Test window",
            width: 0,
            height: 0,
            elements: [
                {
                    type: "text",
                    height: 0,
                    properties: "Hello\n/mnt/test/asdf"
                },
                {
                    type: "text",
                    height: 8,
                    properties: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a imperdiet urna, quis dictum dui. Duis volutpat libero quis tellus maximus pulvinar. Ut id enim quis lectus consectetur consequat et varius est. In iaculis vel sapien vitae sollicitudin. Mauris nec erat nec leo hendrerit accumsan. Aenean luctus, nulla vitae maximus euismod, felis ligula suscipit massa, imperdiet ultrices nulla odio sit amet justo. Aliquam euismod, massa a mollis scelerisque, dui nisl mollis sapien, et elementum mauris ipsum vitae lectus. Integer sit amet justo quis magna dictum consectetur.\n\nProin eu nisl nunc. Ut sodales fringilla quam ac maximus. Fusce lobortis aliquet mauris, vel volutpat elit hendrerit et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla interdum felis ac varius pellentesque. Praesent rhoncus augue est, id fringilla metus tristique vitae. Vestibulum pellentesque est scelerisque nulla ullamcorper scelerisque. In aliquam facilisis mauris, et sodales felis mattis eu. Nunc dictum sapien eu nisi placerat pretium. Vivamus sed venenatis justo. Etiam orci nibh, dignissim non convallis eget, ultrices at metus. Nulla dui neque, vehicula at volutpat eget, eleifend eu magna. In viverra lorem non augue ornare, eget pretium est viverra. Nullam posuere aliquam turpis sed congue. Quisque pulvinar tincidunt diam a ultrices.\n\nFusce congue scelerisque suscipit. Suspendisse finibus, ex sed gravida tristique, dolor nunc rutrum libero, at cursus ipsum ex quis tortor. Donec faucibus ipsum nisl, sed dapibus dui tempus id. Nunc quis mollis ante. Donec finibus elit ac odio vestibulum, ut auctor nisi aliquet. Maecenas ut nibh magna. Nunc lacus elit, sollicitudin quis enim quis, dictum porta lacus. Nullam efficitur sodales fermentum. Quisque ullamcorper laoreet maximus. Quisque lacinia dolor eget ex cursus rutrum. Nam viverra fermentum neque sit amet tincidunt. Aliquam vitae consequat libero. Sed aliquam metus est, sed sagittis magna auctor ut. Sed vel libero iaculis, aliquet sem ac, ultrices ligula. Phasellus tortor leo, ultrices sit amet auctor in, pharetra a orci. Vestibulum tincidunt ipsum ac velit sodales venenatis sed nec tellus.\n\nDonec lobortis magna ac aliquet lobortis. Phasellus eu lacus cursus, cursus massa lacinia, elementum lectus. Praesent consequat, lorem non cursus pulvinar, orci est aliquet metus, venenatis consectetur lectus odio eget dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer condimentum, sem in vestibulum consectetur, neque justo rutrum mi, id condimentum metus leo quis nunc. Sed sit amet mauris libero. Nam consequat tincidunt magna at congue. Duis nibh erat, laoreet ac est vitae, sagittis iaculis risus. Nam id urna sed tellus posuere imperdiet. Ut vitae urna id urna rutrum finibus vitae sed ex. Aenean sed sapien vitae tortor suscipit molestie. Sed dignissim purus eu ultrices eleifend. Curabitur congue elit erat, laoreet euismod odio varius eget. Nam venenatis tristique diam vitae laoreet. Suspendisse metus augue, lobortis tempor lacus quis, consequat aliquet enim.\n\nQuisque in diam interdum ipsum gravida congue sed eget massa. Ut sit amet elementum tortor. Integer ullamcorper vulputate consequat. Ut lorem tortor, ornare vitae ultricies tincidunt, pretium non libero. Proin accumsan molestie diam, ut venenatis ex tempor quis. Nulla nec risus eleifend, lacinia augue ac, gravida urna. Donec cursus lectus justo, id efficitur elit auctor a. Sed fringilla, sapien ultricies viverra tempus, turpis risus mollis mauris, nec ullamcorper nisi mi nec libero.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a imperdiet urna, quis dictum dui. Duis volutpat libero quis tellus maximus pulvinar. Ut id enim quis lectus consectetur consequat et varius est. In iaculis vel sapien vitae sollicitudin. Mauris nec erat nec leo hendrerit accumsan. Aenean luctus, nulla vitae maximus euismod, felis ligula suscipit massa, imperdiet ultrices nulla odio sit amet justo. Aliquam euismod, massa a mollis scelerisque, dui nisl mollis sapien, et elementum mauris ipsum vitae lectus. Integer sit amet justo quis magna dictum consectetur.\n\nProin eu nisl nunc. Ut sodales fringilla quam ac maximus. Fusce lobortis aliquet mauris, vel volutpat elit hendrerit et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla interdum felis ac varius pellentesque. Praesent rhoncus augue est, id fringilla metus tristique vitae. Vestibulum pellentesque est scelerisque nulla ullamcorper scelerisque. In aliquam facilisis mauris, et sodales felis mattis eu. Nunc dictum sapien eu nisi placerat pretium. Vivamus sed venenatis justo. Etiam orci nibh, dignissim non convallis eget, ultrices at metus. Nulla dui neque, vehicula at volutpat eget, eleifend eu magna. In viverra lorem non augue ornare, eget pretium est viverra. Nullam posuere aliquam turpis sed congue. Quisque pulvinar tincidunt diam a ultrices.\n\nFusce congue scelerisque suscipit. Suspendisse finibus, ex sed gravida tristique, dolor nunc rutrum libero, at cursus ipsum ex quis tortor. Donec faucibus ipsum nisl, sed dapibus dui tempus id. Nunc quis mollis ante. Donec finibus elit ac odio vestibulum, ut auctor nisi aliquet. Maecenas ut nibh magna. Nunc lacus elit, sollicitudin quis enim quis, dictum porta lacus. Nullam efficitur sodales fermentum. Quisque ullamcorper laoreet maximus. Quisque lacinia dolor eget ex cursus rutrum. Nam viverra fermentum neque sit amet tincidunt. Aliquam vitae consequat libero. Sed aliquam metus est, sed sagittis magna auctor ut. Sed vel libero iaculis, aliquet sem ac, ultrices ligula. Phasellus tortor leo, ultrices sit amet auctor in, pharetra a orci. Vestibulum tincidunt ipsum ac velit sodales venenatis sed nec tellus.\n\nDonec lobortis magna ac aliquet lobortis. Phasellus eu lacus cursus, cursus massa lacinia, elementum lectus. Praesent consequat, lorem non cursus pulvinar, orci est aliquet metus, venenatis consectetur lectus odio eget dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer condimentum, sem in vestibulum consectetur, neque justo rutrum mi, id condimentum metus leo quis nunc. Sed sit amet mauris libero. Nam consequat tincidunt magna at congue. Duis nibh erat, laoreet ac est vitae, sagittis iaculis risus. Nam id urna sed tellus posuere imperdiet. Ut vitae urna id urna rutrum finibus vitae sed ex. Aenean sed sapien vitae tortor suscipit molestie. Sed dignissim purus eu ultrices eleifend. Curabitur congue elit erat, laoreet euismod odio varius eget. Nam venenatis tristique diam vitae laoreet. Suspendisse metus augue, lobortis tempor lacus quis, consequat aliquet enim.\n\nQuisque in diam interdum ipsum gravida congue sed eget massa. Ut sit amet elementum tortor. Integer ullamcorper vulputate consequat. Ut lorem tortor, ornare vitae ultricies tincidunt, pretium non libero. Proin accumsan molestie diam, ut venenatis ex tempor quis. Nulla nec risus eleifend, lacinia augue ac, gravida urna. Donec cursus lectus justo, id efficitur elit auctor a. Sed fringilla, sapien ultricies viverra tempus, turpis risus mollis mauris, nec ullamcorper nisi mi nec libero. EOF lol"
				},
				{
					type: "choice",
					height: 0,
					properties: [
						{
							text: "Option 1",
							value: "o1"
						},
						{
							text: "Option 2",
							value: "o2",
							symbol: "→ "
						},
						{
							text: "Option 3",
							value: "o3"
						},
						{
							text: "Option 4",
							value: "o4"
						},
						{
							text: "Option 5",
							value: "o5"
						},
						{
							text: "Option 6",
							value: "o6"
						}
					]
				},
                {
                    type: "text",
                    height: 0,
                    properties: "Another unselectable text area"
                },
				{
					type: "choice",
					height: 6,
					properties: [
						{
							text: "Scroll option 1",
							value: "so1"
						},
						{
							text: "Scroll option 2",
							value: "so2",
							symbol: "→ "
						},
						{
							text: "Scroll option 3",
							value: "so3"
						},
						{
							text: "Scroll option 4",
							value: "so4"
						},
						{
							text: "Scroll option 5",
							value: "so5"
						},
						{
							text: "Scroll option 6",
							value: "so6"
						},
						{
							text: "Scroll option 7",
							value: "so7"
						},
						{
							text: "Scroll option 8",
							value: "so8"
						}
					]
				},
				{
					type: "buttons",
					properties: [
						{
							text: "ok",
							value: "b1"
						},
						{
							text: "yes",
							value: "b2"
						},
						{
							text: "no",
							value: "b3"
						},
						{
							text: "maybe",
							value: "b4"
						}
					]
				},
				{
					type: "progress",
					properties: {
						callback: async function(setProgress, setTopText, setBottomText, finish){
							/*
							for (let i = 0; i <= 1000; i += 1){
								setTopText("Counting lol: "+i);
								setProgress(i/1000);
								await new Promise((resolve, reject) => {
									setTimeout(resolve, 10);
								})
							}
							*/
							setProgress(-1);
							await new Promise((resolve, reject) => {
								setTimeout(resolve, 15 * 1000);
							})
							finish();
						}
					}
				}
            ]
        });
        console.log("Returned value:", val);
    }catch(ex){
        console.error(ex.stack);
    }
}
f();
