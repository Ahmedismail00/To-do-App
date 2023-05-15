import  Router  from 'express';
import {addTodoValidation,updateTodoValidation,deleteTodoValidation} from "../validations/todo.js";
import {registerValidation,loginValidation} from "../validations/user.js";
import {UserController, TodoController} from '../controllers/index.js';
import validationErrorsHandler from '../middlewares/validationErrorsHandler.js';
import authMiddleware from '../middlewares/authMiddleware.js';



const router = Router();

router.get('/healthz',(req,res)=>{
    res.send({status:"ok"})
  })
  
router.use(validationErrorsHandler)
router.post('/register',registerValidation,validationErrorsHandler,UserController.register);
router.post('/login',loginValidation,validationErrorsHandler,UserController.login);

router.use(authMiddleware);
router.post('/todo',addTodoValidation,validationErrorsHandler,TodoController.create)
router.patch('/todo',updateTodoValidation,validationErrorsHandler,TodoController.update)
router.delete('/todo',deleteTodoValidation,validationErrorsHandler,TodoController.remove)

router.get('/users',UserController.getAll);

export default router;