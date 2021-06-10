console.log("hey")
var url = 'https://bitroid.ru/frontend_test/frontend_test.json'

var data = {
  "2001": {
    "name": "Товар 1",
    "color": {
      "name": "Красный",
      "value": "#FF004D"
    },
    "sizes": {
      "3001": {
        "name": "S",
        "available": 26,
        "price": 900
      },
      "3002": {
        "name": "M",
        "available": 24,
        "price": 940
      },
      "3003": {
        "name": "L",
        "available": 12,
        "price": 300
      },
      "3004": {
        "name": "XL",
        "available": 32,
        "price": 800
      }
    }
  },
  "2002": {
    "name": "Товар 2",
    "color": {
      "name": "Зеленый",
      "value": "#008365"
    },
    "sizes": {
      "4001": {
        "name": "M",
        "available": 9998,
        "price": 200
      },
      "4002": {
        "name": "L",
        "available": 45,
        "price": 230
      },
      "4003": {
        "name": "XXL",
        "available": 1,
        "price": 1300
      }
    }
  },
  "2003": {
    "name": "Товар 3",
    "color": {
      "name": "Синий",
      "value": "#3B5998"
    },
    "sizes": {
      "5001": {
        "name": "S",
        "available": 0,
        "price": 0
      },
      "5002": {
        "name": "M",
        "available": 0,
        "price": 0
      },
      "5003": {
        "name": "L",
        "available": 23,
        "price": 130
      }
    }
  },
  "2004": {
    "name": "Товар 4",
    "color": {
      "name": "Марсала",
      "value": "#4C1A2C"
    },
    "sizes": {
      "6001": {
        "name": "L",
        "available": 0,
        "price": 0
      },
      "6002": {
        "name": "XL",
        "available": 0,
        "price": 0
      },
      "6003": {
        "name": "XXL",
        "available": 0,
        "price": 0
      }
    }
  }
}

var array_size  = ["S", "M", "L", "XL", "XXL"]
var filtering_array = []
var name_product_array = []

for (size_str in array_size)
	for (key in data)
	{
		for (val in data[key]["sizes"])
			if(array_size[size_str] === data[key]["sizes"][val]["name"])
			{
				var color_value = data[key]["color"]["name"]
				var name_value = data[key]["name"]
				var size_value = data[key]["sizes"][val]
				size_value.color = color_value
				size_value.name_product = name_value
				filtering_array.push(data[key]["sizes"][val])
			}
		var name_product = data[key]["name"] 
		if(name_product_array.indexOf(name_product) === -1)
			name_product_array.push(name_product)
	}


// add 4 button with productSub
var my_div2 = document.getElementById("org_div2");
var newDiv = document.createElement("div");
var html = ''
for(obj in name_product_array){
	var obj_el_p = name_product_array[obj]
	html += `<button id="${obj_el_p}" onclick="create_chart(this.id)">${obj_el_p}</button>`
}
newDiv.innerHTML = html
my_div2.parentNode.insertBefore(newDiv, my_div2);


// filter by size
var filtering_size_array = []
for (obj in filtering_array) filtering_size_array.push(filtering_array[obj])
// filter by price
sortByPrice(filtering_array)

// table creation at startup
btn_filter_table(0)

function btn_filter_table(num_filter){
	if(num_filter === 0) create_table(filtering_size_array)
	if(num_filter === 1) create_table(filtering_array)
}


function create_table(data_array){
	//if the table is exist, delete it
	var my_div = document.getElementById("table_obj");
	if(my_div != null) my_div.remove()
	
	//create table
	var newDiv = document.createElement("div");
	newDiv.id = "table_obj"
	var html = '<table border="1"><caption>Таблица размеров одежды</caption><tr><th>Название товара</th><th>Цвет</th><th>Размер</th><th>Доступное кол-во</th><th>Цена</th></tr>'

	for (obj in data_array)
		{
			var obj_el = data_array[obj]
			html += `<tr><td>${obj_el["name_product"]}</td>`
			
			if(obj_el["color"] === "Красный")
				html += `<td class="red_color">${obj_el["color"]}</td>`
			if(obj_el["color"] === "Синий")
				html += `<td class="blue_color">${obj_el["color"]}</td>`
			if(obj_el["color"] === "Зеленый")
				html += `<td class="green_color">${obj_el["color"]}</td>`
			if(obj_el["color"] === "Марсала")
				html += `<td class="marsala_color">${obj_el["color"]}</td>`
			
			html += `<td>${obj_el["name"]}</td><td>${obj_el["available"]}</td><td>${obj_el["price"]}</td></tr>`
		}

	html += '</table>' 
	newDiv.innerHTML = html
	var my_div = document.getElementById("org_div1");
	my_div.parentNode.insertBefore(newDiv, my_div);
}

// sort by price
function sortByPrice(arr) {
  arr.sort((a, b) => a.price > b.price ? 1 : -1);
}

colors_name = ["Марсала", "Зеленый", "Красный", "Синий"]

create_chart("Товар 1")

function create_chart(index_product){
	//chart data
	var myVinyls = {
		"Size1": 0,
		"Size2": 0,
		"Size3": 0,
		"Size4": 0
	};
	
	chart_product(index_product, myVinyls)
	create_chart_el()	
	
	var myPiechart = new PieChart(
		{
			data:myVinyls,
			colors:["#762B3A","#9A5252", "#1F3F4A","#3D1F4A"]
		}
	);
	console.log(myVinyls)
	myPiechart.draw();
}

function chart_product(str_product, myVinyls){
	var index_color = 0
	for (product_obj in filtering_array){
		if(str_product === filtering_array[product_obj]["name_product"])
		{
			if(index_color == 0)
				myVinyls.Size1 += filtering_array[product_obj]["available"]
			if(index_color == 1)
				myVinyls.Size2 += filtering_array[product_obj]["available"]
			if(index_color == 2)
				myVinyls.Size3 += filtering_array[product_obj]["available"]
			if(index_color == 3)
				myVinyls.Size4 += filtering_array[product_obj]["available"]
			index_color += 1
		}
	}
}





		