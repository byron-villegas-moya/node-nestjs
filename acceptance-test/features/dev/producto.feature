Feature: Productos

  Scenario: Obtener los productos
    Given Dado una solicitud
    When Llamamos al servicio
    Then Retorna la lista de productos

  Scenario: Obtener producto mediante sku
    Given Dado un sku "<sku>"
    When Obtenemos el producto
    Then Validamos la respuesta con codigo http <httpCode> con codigo error "<codigoError>" con mensaje error "<mensajeError>"

    Examples: 
      | sku      | httpCode | codigoError   | mensajeError                         |
      | 15207414 |      200 | null          | null                                 |
      | 00000000 |      409 | EXPNE00       | Producto no encontrado               |
      | aaaaaaaa |      409 | EXCSDSNE00    | Codigo sku debe ser un numero entero |

  Scenario: Obtener productos ordenados por propiedad
    Given Dado un orden "<orden>"
    When Obtenemos los productos ordenados por la propiedad
    Then Validamos la respuesta con codigo http <httpCode> con codigo error "<codigoError>" con mensaje error "<mensajeError>"

    Examples: 
      | orden    | httpCode | codigoError | mensajeError            |
      | +precio  |      200 | null        | null                    |
      | -marca   |      200 | null        | null                    |
      | aaaaaaaa |      409 | EXPNE01     | Propiedad no encontrada |

  Scenario: Obtener productos filtrados por propiedad y valor
    Given Dado un filtro "<filtro>" y un valor "<valorFiltro>"
    When Obtenemos los productos filtrados por la propiedad y valor
    Then Validamos la respuesta con codigo http <httpCode> con codigo error "<codigoError>" con mensaje error "<mensajeError>"

    Examples: 
      | filtro   | valorFiltro | httpCode | codigoError    | mensajeError                                     |
      | precio   |      150000 |      200 | null           | null                                             |
      | marca    | Apple       |      200 | null           | null                                             |
      | precio   | aaa         |      409 | EXDI00         | Dato invalido                                    |
      | aaaaaaaa | aa          |      409 | EXPNE01        | Propiedad no encontrada                          |
