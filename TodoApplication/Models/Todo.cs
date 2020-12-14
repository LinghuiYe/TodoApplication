using System;
#nullable disable

namespace TodoApplication.Models
{
    public partial class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Time { get; set; }
        public string Detail { get; set; }
    }
}
