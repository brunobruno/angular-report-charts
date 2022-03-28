export type projectType = {
    description: string,
    gatewayIds:string[],
    image:string,
    industry:string,
    name:string,
    projectId:string,
    rule:string,
    structure:string,
    userIds:string[],
    website:string
}[]

const projectFirstItem = {
    description:'',
    gatewayIds:[],
    image:'',
    industry:'',
    name:'All projects',
    projectId:'',
    rule:'',
    structure:'',
    userIds:[],
    website:''
}

export type gatewayType = {
    apiKey: string,
    description:string,
    gatewayId:string,
    name:string;
    secondaryApiKey:string,
    type:string,
    userIds:string[]
}[]

const gatewayFirstItem = {
    apiKey:'',
    description:'',
    gatewayId:'',
    name:'All gateways',
    secondaryApiKey:'',
    type:'',
    userIds:[]
}

const colorsArray = [
    '#A259FF',
    '#F24E1E',
    '#FFC107',
    '#6497B1'
]

export {projectFirstItem,gatewayFirstItem,colorsArray}



