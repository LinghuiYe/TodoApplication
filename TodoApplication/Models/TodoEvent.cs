using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApplication.Models
{
    public class TodoEvent
    {
        public int Id { get; set; }
        public String Date { get; set; }
        public String Title { get; set; }
        public String Detail { get; set; }
    }
}
