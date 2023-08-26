Esdras Daniel Amaya Vela | No. Control: 21100155

# MODELO DE CAJA

En HTML y CSS, todos los elementos que se puede encontrar en una pagina web son consideradas como cajas rectangulares.
Este **modelo de caja** o tambien llamado como **box model**, lo podemos encontrar en las distintas paginas web como los elementos:
+ Parrafos
+ Enlaces
+ Imagenes
+ Tablas

Estas cajas son situadas por el navegador de la forma en que haya sido indicado por el programador para maquetar la pagina web.

Existen dos tipos de cajas utilizadas en las paginas web de HTML, las **cajas en bloque** y las **cajas en linea**. Las dos tipos de cajas tienen las caracteristicas:

| **Caja en bloque** | **Caja en linea** |
|--------------------|-------------------|
|Fuerza el salto de linea al llegar al final de la linea. | No fuerza ningun salto de linea al llegar al final de la linea. |
|Se extenderá en la dirección de la línea para llenar todo el espacio disponible que haya en su contenedor. | No aplica las propiedades height y width|
|Respeta las propiedades height y width. | Aplica relleno, margen y bordes verticales, pero no mantienen alejadas otras cajas en linea. |
|El relleno, margen y el borde mantienen a los otros elementos alejados de la caja. | Aplica relleno, margen y bordes horizontales, y mantienen alejadas otras cajas en linea. |

### **Partes que componen una caja**

![Modelo de caja](https://hablacode.org/static/media/Box-Model.ebc21d7b.PNG "Modelo de caja")

+ **Margin/Margen:**

Es la distancia entre el borde de la caja y los elementos que la rodean. Es posible controlar su tamaño utilizando la propiedad ___margin___ y otras propiedades relacionadas.

+ **Border/Borde:**

Envuelve el contenido y el de relleno. Es posible controlar su tamaño y estilo utilizando la propiedad de ___border___ y otras propiedades relacionadas.

+ **Padding/Relleno:**

Establece la distancia entre el limite interior de la caja y exterior (borde). Es posible controlar su tamaño utilizando la propiedad ___padding__ y otras propiedades relacionadas.

+ **Content/Contenido:**

Es el area donde se muestra el contenido de nuestra pagina web, su tamaño puede cambiarse utilizando las propiedades ___width___ y ___height___.

#
# PROPIEDAD DISPLAY

Especifica si un elemento es tratado como ___block___(bloque) o ___inline___(en linea) y el diseño usado por sus hijos, como ___flow layout___(Diseño de flujo), ___grid___(Cuadricula) o ___flex___(Flexible).
Establece los tipos de visualizacion interna y externa de un elemento. La visualizacion externa establece la participacion de un elemento flow layout; la visualizacion interna establece el diseño de los hijos.

Algunos valores de display estan totalmente definidos con sus especificaciones propias; por ejemplo el detalle de que pasa cuando display: ___flex___ es declarado y definido en la especificacion de Modelo Flexible de Caja de CSS.

### Valores de display

#### ___display-outside___

Estas palabras clave especifican el tipo de pantalla externa del elemento.

| **Valor** | **Descripcion** |
|-----------|-----------------|
| block | El elemento genera un cuadro de elemento bloque. |
| inline |  El elemento genera uno o mas cuadros de elemento en linea. |
| run-in | El elemento genera un cuadro de ejecucion. Los elementos de ejecucion actuan como lineas o bloques, dependiendo de los elementos circundantes. | 

#### ___display-inside___

Estas palabras clave especifican el tipo de pantalla interna del elemento, que define el tipo de contexto de formato que establece su contenido.

| **Valor** | **Descripcion** |
|-----------|-----------------|
| flow | El elemento expone su contenido utilizando el diseño de flujo (diseño en bloque y en línea). |
| flow-root | El elemento genera un cuadro de elemento de bloque que establece un nuevo contexto de formato de bloque. |
| table | Estos elementos se comportan como elementos HTML ___table___. Define un cuadro de nivel de bloque. |
| flex | El elemento se comporta como un elemento de bloque y establece su contenido de acuerdo con el modelo de flexbox. |
| grid | El elemento se comporta como un elemento de bloque y establece su contenido de acuerdo con el modelo de cuadrícula. |
| subgrid | Si el elemento padre tiene display:grid, el elemento en sí y su contenido se establecen de acuerdo con el modelo de cuadrícula. | 
| ruby | El elemento se comporta como un elemento en línea y establece su contenido de acuerdo con el modelo de formato ruby. |

#### ___display-internal___

Algunos modelos de disposición, como table y ruby, tienen una estructura interna completa, con varios papeles diferentes que sus hijos y descendientes pueden llenar. Esta sección define los valores de visualización "internos", que sólo tienen significado dentro de ese modo de disposición particular.

| **Valor** | **Descripcion** |
|-----------|-----------------|
| table-row-group | Estos elementos se comportan como ___tbody___ en elementos HTML. |
| table-header-group | Estos elementos se comportan como elementos HTML de ___thead___. | 
| table-footer-group | Estos elementos se comportan como elementos HTML ___tfoot___. |
| table-row | Estos elementos se comportan como elementos HTML ___tr___ |
| table-cell | Estos elementos se comportan como elementos HTML de ___td___. |
| table-column-group | Estos elementos se comportan como elementos HTML ___colgroup___. |
| table-column | Estos elementos se comportan como elementos HTML ___col___. |
| table-caption	| Estos elementos se comportan como elementos HTML de ___caption___. |
| ruby-base | Estos elementos se comportan como elementos ___rb___. |
| ruby-text | Estos elementos se comportan como elementos ___rt.___ | 
| ruby-base-container | Estos elementos se comportan como elementos ___rbc.___ generados como cajas anónimas. |
| ruby-text-container |	Estos elementos se comportan como elementos ___rtc.___ |

#### ___display-box___

Estos valores se definen si un elemento genera cuadros de visualización en absoluto.

| **Valor** | **Descripcion** |
|-----------|-----------------|
| contents | Estos elementos no producen una caja específica por sí mismos. Son reemplazados por su pseudo-caja y sus cajas infantiles. |
| none | Desaparece la visualización de un elemento para que no tenga ningún efecto en el diseño. |

