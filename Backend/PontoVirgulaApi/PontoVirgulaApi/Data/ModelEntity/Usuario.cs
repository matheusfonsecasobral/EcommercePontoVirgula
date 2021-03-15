using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIPontoVirgula.Data.Repository.ModelEntity
{
    [Table("USUARIO")]
    public class Usuario
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string NOME { get; set; }

        [Required]
        public string EMAIL { get; set; }

        [Required]
        public string SENHA { get; set; }
    }
}
