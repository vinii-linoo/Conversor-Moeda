const form = document.getElementById("converterForm")
const amount = document.getElementById("amount")
const fromCurrency = document.getElementById("fromCurrency")
const toCurrency = document.getElementById("toCurrency")
const convertedAmount = document.getElementById("convertedAmount")
const loading = document.querySelector(".loading")
const result = document.querySelector(".result")
const error = document.querySelector(".error")
const converterBtn = document.getElementById("converterBtn")

const API_URL = "https://api.exchangerate-api.com/v4/latest/"

async function convertMoney() {


	loading.style.display = "block"
	error.style.display = "none"
	result.style.display = "none"

	try {
		const response = await fetch(API_URL + fromCurrency.value)
		const data = await response.json()

		const rate = data.rates[toCurrency.value]
		const convertedValue = (amount.value * rate).toLocaleString('pt-br', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})


		convertedAmount.value = convertedValue
		result.style.display = "block"


		result.innerHTML = `
			<div style="font-size: 1.4rem;">
			${Number(amount.value).toLocaleString('pt-br', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
			</div>

			<div style="font-size: 0.9rem; opacity: 0.8; margin-top: 10px;">
				Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
			</div>
		
		`


	}
	catch (err) {
		console.error(err)
		error.style.display = "block"
		error.innerHTML = `Falha ao converter moeda! Tente Novamente`
	}

	loading.style.display = "none"
}



form.addEventListener("submit", function (event) {
	event.preventDefault()
	convertMoney()
})