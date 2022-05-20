using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MaryKay_Web;
using System.Web.Http.Cors;

namespace MaryKay_Web.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class pedidoesController : ApiController
    {
        private MaryKayEntities db = new MaryKayEntities();

        // GET: api/pedidoes
        public IQueryable<pedido> Getpedido()
        {
            return db.pedido;
        }

        // GET: api/pedidoes/5
        [ResponseType(typeof(pedido))]
        public IHttpActionResult Getpedido(int id)
        {
            pedido pedido = db.pedido.Find(id);
            if (pedido == null)
            {
                return NotFound();
            }

            return Ok(pedido);
        }

        // PUT: api/pedidoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putpedido(int id, pedido pedido)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pedido.id_pedido)
            {
                return BadRequest();
            }

            db.Entry(pedido).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!pedidoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/pedidoes
        [ResponseType(typeof(pedido))]
        public IHttpActionResult Postpedido(pedido pedido)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.pedido.Add(pedido);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = pedido.id_pedido }, pedido);
        }

        // DELETE: api/pedidoes/5
        [ResponseType(typeof(pedido))]
        public IHttpActionResult Deletepedido(int id)
        {
            pedido pedido = db.pedido.Find(id);
            if (pedido == null)
            {
                return NotFound();
            }

            db.pedido.Remove(pedido);
            db.SaveChanges();

            return Ok(pedido);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool pedidoExists(int id)
        {
            return db.pedido.Count(e => e.id_pedido == id) > 0;
        }
    }
}