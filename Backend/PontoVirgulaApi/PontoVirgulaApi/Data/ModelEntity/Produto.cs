using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIPontoVirgula.Data.Repository.ModelEntity
{
    [Table("PRODUTO")]
    public class Produto
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string NOME { get; set; }

        public string DESCRICAO { get; set; }

        [Required]
        public decimal PRECO { get; set; }

        [Required]
        public int ESTOQUE { get; set; }

        public string LINK_IMG { get; set; }
    }
}
