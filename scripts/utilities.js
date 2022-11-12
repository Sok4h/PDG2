
function sumAllCategories(answers) {

    console.log(answers)
  
    const basket = answers.reduce((basket, fruit) => {
  
      for (const [number, respuesta] of Object.entries(fruit)) {
        console.log(respuesta)
        if (!basket[number]) {
          basket[number] = { name: respuesta.name, value: 0 };
        }
  
  
        basket[number].value += respuesta.value;
        //console.log( basket[number].)
  
      }
  
      return basket;
    }, []);
  
    console.log(basket)
    return basket
  }


  let maximoCategoria = 35

  let maximoGeneral = 315;

  let maximoPregunta = 7