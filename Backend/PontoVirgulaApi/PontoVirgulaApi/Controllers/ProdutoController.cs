using APIPontoVirgula.Data;
using APIPontoVirgula.Data.Repository.ModelEntity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PontoVirgulaApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPontoVirgula.Controllers
{
    [Route("api/[controller]")]

    [ApiController]

    public class ProdutoController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<ProdutoModelView>>> GetList([FromServices] DataContext context)
        {
            List<Produto> produtos = await context.Produto
                                .AsNoTracking()
                                .ToListAsync();

            List<ProdutoModelView> prod2 = produtos.Select(x => new ProdutoModelView()
            {
                 Nome = x.NOME,
                 Descricao = x.DESCRICAO,
                 Estoque = x.ESTOQUE,
                 LinkImg = x.LINKIMG,
                 Preco = x.PRECO
            }).ToList();

            return Ok(prod2);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProdutoModelView>> GetProdutoById([FromServices] DataContext context, int id)
        {
            Produto produto = await context.Produto
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(x => x.ID == id);

            ProdutoModelView prod2 = new ProdutoModelView()
            {
                Nome = produto.NOME,
                Descricao = produto.DESCRICAO,
                Estoque = produto.ESTOQUE,
                LinkImg = produto.LINKIMG,
                Preco = produto.PRECO
            };

            return prod2;
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
                produto.LINKIMG = produtoModel.LinkImg;

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
