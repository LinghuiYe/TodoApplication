using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApplication.Models
{
    public class TodoDataAccessLayer
    {
        TodoDBContext db = new TodoDBContext();
        public IEnumerable<Todo> GetAllTodos()
        {
            try
            {
                return db.Todos.OrderByDescending(x=>x.Time).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine("GetDataFromDB Error {0}", e.ToString());
                return null;
            }
        }

        // To Add new todo record
        public int AddTodo(Todo todo) 
        {
            try
            {
                db.Todos.Add(todo);
                db.SaveChanges();
                return 1;
            }
            catch(Exception e)
            {
                Console.WriteLine("AddDataToDB Error {0}", e.ToString());
                return 0;
            }
        }

        public int UpdateTodo(Todo todo)
        {
            try
            {
                db.Entry(todo).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch (Exception e)
            {
                Console.WriteLine("UpdateDataToDB Error {0}", e.ToString());
                return 0;
            }
        }

        // Get the details of a particular todo
        public Todo GetTodoData(int id) 
        {
            try
            {
                Todo todo = db.Todos.Find(id);
                return todo;
            }
            catch (Exception e)
            {
                Console.WriteLine("GetOneDataFromDB Error {0}", e.ToString());
                return null;
            }
        }

        public int DeleteTodo(int id) 
        {
            try
            {
                Todo todo = db.Todos.Find(id);
                db.Todos.Remove(todo);
                db.SaveChanges();
                return 1;
            }
            catch (Exception e)
            {
                Console.WriteLine("DeleteDataFromDB Error {0}", e.ToString());
                return 0;
            }
        }
    }
}
