# Requerimentos

**Back**
- [ ] DB
    - [ ] Model
    - [ ] Filling
- [ ] General API
- [ ] Maintenance API
- [ ] Routing
- [ ] Dynamic front generation

**Front**
- [ ] Landing page
    - [ ] Menú a usar en cada página
    - [ ] Información general a rellenar luego
- [ ] Maintenance page
    - [ ] Banner debajo de menú para acceder a docs de dicho módulo
    - [ ] Implementación estática del diseño


# TL;DR

Este módulo se encarga de la gestión del mantenimiento de las máquinas, de manera que el departamento de producción distribuya las máquinas según lo requieran.

Para ello, detalla el resumen del estado de las máquinas y permite gestionar el mantenimiento de las mismas.

Los datos de cada máquina se respaldan en su base de datos, de manera que la gestión se guarde a través de las sesiones y sea posible mostrar la información de las máquinas de manera dinámica.

De haber una notificación o avería en una máquina reportada por el departamento de producción, habrá un aviso apenas se ingrese a este departamento, de manera que pueda darse solución a las mismas de inmediato.

Por último, cualquier planificación de mantenimiento será notificada al departamento de producción apenas se ingrese al mismo, para que el mismo pueda cambiar la distribución de máquinas en las líneas de producción sin afectar la misma.


# Instrucciones de uso

En el primer apartado se hace notar el resumen del estado de las máquinas por tipo, entre las cuales se encuentran las máquinas _chocolateras_, _caramelizadoras_, _carameleras_ y _chicleras_.

Por cada tipo es visible el estado de la totalidad de las máquinas de las que dispone la fábrica, que puede ser _en uso_, _con notificacion_, _disponibles_, _en mantenimiento_, o _defectuosas_[; cada uno de los cuales muestra la cantidad de máquinas en dicho estado, por cada tipo de máquina] .

En el segundo apartado es donde se puede gestionar el mantenimiento de las máquinas, teniendo las opciones para planificar los siguientes tipos de mantenimiento:  
* Preventivo: Para máquinas que no tengan notificación ni defecto.
* Predictivo: Para máquinas que tengan notificación.
* Correctivo: Para máquinas con defectos.

De igual manera, es posible modificar la planificación o la realización de un mantenimiento en progreso con sus respectivas opciones.

Con todo ello, al final se muestra el estado del mantenimiento de las máquinas para las que el mismo se ha planificado o iniciado, mostrando los días faltantes para su inicio o los días para que la máquina vuelva a estar disponible, respectivamente.


# Documentación técnica

## Modelo de DB

La visualización del estado de las máquinas de manera dinámica y la gestión del mantenimiento de las mismas es posible gracias al respaldo de sus datos en su base de datos, la cual sigue el siguiente modelo con sus posibles valores:
* id: int
* type: str
    - chocolatera
    - caramelera
    - caramelizadora
    - chiclera
* state: str
    - uso
    - disponible
    - mantenimiento
    - notificada
    - defectuosa
* dateMaintenance: str
    - null
    - date
* dateAvailability: str
    - null
    - date
* typeMaintenance: str
    - preventivo
    - predictivo
    - correctivo
    - null
* availability: int
    - 0 (no disponible)
    - 1 (disponible)
* line: int

_Nota:_ Las fechas estarán en formato YYYY/MM/DD.

Mientras `type` y `state` son utilizadas para mostrar el resumen del estado de las máquinas, la gestión del mantenimiento y la visualización del mismo es posible gracias al uso de `id`, `type`, `plan` y `availability`, de las cuales, las últimas dos permiten diferenciar el tipo de mantenimiento y la modificación del mismo.


## API Endpoints

(To explain on the go)

# To talk with Ángel
Maintenance:
1. Machine's state display
2. Machine maintenance management

Production:
1. Production lines
2. Machine minimum number requirement
3. Machines in use
4. Machine management
5. Issue or malfunction notification
6. Ingredients definition
7. Ingredients fulfillment
7. Production rate
8. Production batch's introduction