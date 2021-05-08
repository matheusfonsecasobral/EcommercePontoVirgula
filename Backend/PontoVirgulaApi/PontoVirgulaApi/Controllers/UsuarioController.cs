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
        public async Task<ActionResult<UsuarioModelView>> GetValidation([FromServices] DataContext context, [FromBody] UsuarioModelView usuarioModel)
        {
            try
            {
                var usuario = await context.Usuario
                                               .AsNoTracking()
                                               .FirstOrDefaultAsync(x => x.EMAIL == usuarioModel.Email);

                if (usuario == null)
                {
                    return null;
                }
                else
                {
                    if (usuario.SENHA == usuarioModel.Senha)
                    {
                        return new UsuarioModelView()
                        {
                            NomeCompleto = usuario.NOME,
                            Email = usuario.EMAIL,
                            Senha = usuario.SENHA,
                            Admin = usuario.ADMIN
                        };
                    }
                    else
                    {
                        return null;
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
        public async Task<ActionResult<UsuarioModelView>> GetUsuarioById([FromServices] DataContext context, int id)
        {
            var usuario = await context.Usuario
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(x => x.ID == id);

            return new UsuarioModelView()
            {
                NomeCompleto = usuario.NOME,
                Email = usuario.EMAIL,
                Senha = usuario.SENHA,
                Admin = usuario.ADMIN
            };
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<UsuarioModelView>> GetUsuarioByEmail([FromServices] DataContext context, string email)
        {
            var usuario = await context.Usuario
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(x => x.EMAIL == email);

            return new UsuarioModelView()
            {
                NomeCompleto = usuario.NOME,
                Email = usuario.EMAIL,
                Senha = usuario.SENHA,
                Admin = usuario.ADMIN
            };
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
