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
    public class proveedorsController : ApiController
    {
        private MaryKayEntities db = new MaryKayEntities();

        // GET: api/proveedors
        public IQueryable<proveedor> Getproveedor()
        {
            return db.proveedor;
        }

        // GET: api/proveedors/5
        [ResponseType(typeof(proveedor))]
        public IHttpActionResult Getproveedor(int id)
        {
            proveedor proveedor = db.proveedor.Find(id);
            if (proveedor == null)
            {
                return NotFound();
            }

            return Ok(proveedor);
        }

        // PUT: api/proveedors/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putproveedor(int id, proveedor proveedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != proveedor.id_proveedor)
            {
                return BadRequest();
            }

            db.Entry(proveedor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!proveedorExists(id))
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

        // POST: api/proveedors
        [ResponseType(typeof(proveedor))]
        public IHttpActionResult Postproveedor(proveedor proveedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.proveedor.Add(proveedor);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = proveedor.id_proveedor }, proveedor);
        }

        // DELETE: api/proveedors/5
        [ResponseType(typeof(proveedor))]
        public IHttpActionResult Deleteproveedor(int id)
        {
            proveedor proveedor = db.proveedor.Find(id);
            if (proveedor == null)
            {
                return NotFound();
            }

            db.proveedor.Remove(proveedor);
            db.SaveChanges();

            return Ok(proveedor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool proveedorExists(int id)
        {
            return db.proveedor.Count(e => e.id_proveedor == id) > 0;
        }
    }
}