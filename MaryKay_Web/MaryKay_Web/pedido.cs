//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MaryKay_Web
{
    using System;
    using System.Collections.Generic;
    
    public partial class pedido
    {
        public int id_pedido { get; set; }
        public int cantidad { get; set; }
        public System.DateTime fecha_emision { get; set; }
        public System.DateTime fecha_entrega { get; set; }
        public int proveedor { get; set; }
        public int producto { get; set; }
    
        public virtual producto producto1 { get; set; }
        public virtual proveedor proveedor1 { get; set; }
    }
}
