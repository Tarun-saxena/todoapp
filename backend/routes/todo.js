let todos=[];
let id=1;


export async function getAllTodo (req, res, next){
    res.json(todos);
}

export async function createTodo (req, res, next){
   
    const todocontent=req.body.todocontent;

   
    if(todocontent){
        const todoid=id;
        let todo={
        "id":todoid,
        "todocontent":todocontent
        }
        todos.push(todo);
        id++;
        res.status(201).json(todo)
    }
    else{
        res.status(404).json({
            message:"invalid input"
        })
    }

}

// export async function updateTodo (req, res, next){
//     const todoid=req.params.id;
//     const todoupdatedcontent=req.body.todocontent;

//     for(let i=0;i<todos.length;i++){
//         if(todos[i].id==todoid){
//             todos[i].todocontent=todoupdatedcontent;

//         }
        
//     }

// }

// export async function searchTodo (req, res, next){
//     const todoseachcontent=req.query.todocontent;

//     if(!todoseachcontent){
//         res.status(400).json({
//             message:"query parameter missing"
//         })
//     }

//     let matchedtodos=[]
//     for(let i=0;i<todos.length;i++){
//         if(todos[i].todocontent.toLowerCase().includes(todoseachcontent.toLowerCase())){
//             matchedtodos.push(todos[i]);

//         }
        
//     }
//     res.json(matchedtodos);
// }

export async function deleteTodoById (req, res, next){
    const todoid=parseInt(req.params.id);
if(!todoid){
   res.status(401).json({
    message:" todo not found "
   })
}
else{
    let newtodos=[]
     for(let i=0;i<todos.length;i++){
        if(todos[i].id!=todoid){
            newtodos.push(todos[i]);

        }
        
    }
    todos=newtodos;
    res.status(204).send();

}

    

}