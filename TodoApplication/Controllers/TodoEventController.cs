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
        int i = 5;

        // GET: api/<TodoEventController>/get
        [HttpGet]
        public IEnumerable<TodoEvent> Get()
        {
            return Enumerable.Range(1, i).Select(index => new TodoEvent
            {
                Id = index,
                Date = DateTime.Now.AddDays(index).ToString(),
                Title = "test title",
                Detail = "test detailaddddddddddddddddddddddddddddddddddddddd"
            })
            .ToArray();
        }

        //POST api/<TodoEventController>
        [HttpPost]
        public void Post([FromBody] TodoEvent todoEvent)
        {
            i += 1;
        }

        //PUT api/<TodoEventController>
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] TodoEvent todoEvent)
        {
            i -= 1;
        }

        //DELETE api/<TodoEventController>/<id>
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            i -= 1;
        }
    }
}
