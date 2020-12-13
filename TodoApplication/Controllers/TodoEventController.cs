using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApplication.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodoApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoEventController : ControllerBase
    {

        TodoDataAccessLayer objTodo = new TodoDataAccessLayer();

        // GET: api/<TodoEventController>/get
        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            return objTodo.GetAllTodos();
        }

        //POST api/<TodoEventController>
        [HttpPost]
        public int Post([FromBody] Todo todo)
        {
            return objTodo.AddTodo(todo);
        }

        //PUT api/<TodoEventController>
        [HttpPut("{id}")]
        public int Put(int id, [FromBody] Todo todo)
        {
            return objTodo.UpdateTodo(todo);
        }

        //DELETE api/<TodoEventController>/<id>
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            return objTodo.DeleteTodo(id);
        }
    }
}
