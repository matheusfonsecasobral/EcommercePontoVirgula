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

    public class UsuarioController : ControllerBase
    {
        [HttpPost("Validation")]
        public async Task<ActionResult> GetValidation([FromServices] DataContext context, [FromBody] UsuarioModelView usuarioModel)
        {
            try
            {
                var usuario = await context.Usuario
                                               .AsNoTracking()
                                               .FirstOrDefaultAsync(x => x.EMAIL == usuarioModel.Email);

                if (usuario == null)
                {
                    return Ok(false);
                }
                else
                {
                    if (usuario.SENHA == usuarioModel.Senha)
                    {
                        return Ok(true);
                    }
                    else
                    {
                        return Ok(false);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> GetList([FromServices] DataContext context)
        {
            var usuarios = await context.Usuario
                                .AsNoTracking()
                                .ToListAsync();

            return usuarios;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuarioById([FromServices] DataContext context, int id)
        {
            var usuario = await context.Usuario
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(x => x.ID == id);

            return usuario;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromServices] DataContext context, UsuarioModelView usuarioModel)
        {
            try
            {
                Usuario usuario = new Usuario();
                usuario.EMAIL = usuarioModel.Email;
                usuario.NOME = usuarioModel.NomeCompleto;
                usuario.SENHA = usuarioModel.Senha;

                context.Usuario.Add(usuario);
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
