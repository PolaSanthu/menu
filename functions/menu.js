const menuData=['rice','dal','salad'];
exports.handler=async(event,context)=>{
    
    switch (event.httpMethod){
        case 'POST':
            menuData.length=0
            const menu=JSON.parse(event.body)
            menu.forEach((element)=>menuData.push(element))
            return{
                statusCode:200,
                body:JSON.stringify(menu)
            }
            
        case 'GET':
            return{
                statusCode:200,
                body:JSON.stringify(menuData)
            }
    }
}