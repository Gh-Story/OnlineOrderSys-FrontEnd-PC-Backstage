import Vue from 'vue'

let server = process.env.VUE_APP_SERVER;
//let abc = process.env.VUE_APP_abc;
let publisherUrl = '/querypublisherall';
let bookPageUrl = '/querybookforavgpageadn';

export default {
    
	QueryList:function(paramObj,callBack){
		Vue.axios.get(`http://localhost:8080/BookShop/querybookforavgpageadn`,{params:paramObj}).then(r=>{
			//console.log(paramObj);
			callBack(r.data);
		});
	},
	QueryAll:function(paramObj,callBack){
		Vue.axios.get(`http://localhost:8080/BookShop/querybookfortitlelike`).then(r=>{
			console.log(paramObj);
			callBack(r.data);
		});
	},
}
