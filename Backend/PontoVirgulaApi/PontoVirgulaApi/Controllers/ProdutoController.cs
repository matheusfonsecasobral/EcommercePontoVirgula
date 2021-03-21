using APIPontoVirgula.Data;
using APIPontoVirgula.Data.Repository.ModelEntity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PontoVirgulaApi.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APIPontoVirgula.Controllers
{
    [Route("api/[controller]")]

    [ApiController]

    public class ProdutoController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Produto>>> GetList([FromServices] DataContext context)
        {
            List<Produto> produtos = await context.Produto
                                .AsNoTracking()
                                .ToListAsync();

            return produtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetProdutoById([FromServices] DataContext context, int id)
        {
            Produto produto = await context.Produto
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(x => x.ID == id);

            return produto;
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromServices] DataContext context, ProdutoModelView produtoModel)
        {

            try
            {
                Produto produto = new Produto();
                produto.NOME = produtoModel.Nome;
                produto.DESCRICAO = produtoModel.Descricao;
                produto.PRECO = produtoModel.Preco;
                produto.ESTOQUE = produtoModel.Estoque;
                produto.LINK_IMG = produtoModel.LinkImg;

                context.Produto.Add(produto);
                await context.SaveChangesAsync();
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
