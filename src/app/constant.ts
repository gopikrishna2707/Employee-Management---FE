 export const fORMTYPES:{[key :string] : {
    label?:string,
    toolTip?:string,
    type?:string,
    input_type?:string
}} = {
   name: {
    label : 'name',
    input_type:'text',
    toolTip : 'Name',
    type : 'input'
   },
   password : {
    label : 'passsword',
    input_type:'text',
    toolTip :'Password',
    type :'input'
   },
   state : {
    label :'Select State',
    input_type :'text',
    toolTip : 'state',
    type :'dropdown'
   },
   number : {
    label :'number',
    input_type :'number',
    toolTip : 'state',
    type :'input'
   }
}