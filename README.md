# tinkoff-api-securities

[![build](https://github.com/samgozman/tinkoff-api-securities/actions/workflows/node.js.yml/badge.svg)](https://github.com/samgozman/tinkoff-api-securities/actions/workflows/node.js.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8e29e7423e70477e82c5a4de6836896a)](https://www.codacy.com/gh/samgozman/tinkoff-api-securities/dashboard?utm_source=github.com&utm_medium=referral&utm_content=samgozman/tinkoff-api-securities&utm_campaign=Badge_Grade)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=samgozman_tinkoff-api-securities&metric=alert_status)](https://sonarcloud.io/dashboard?id=samgozman_tinkoff-api-securities)
[![npm](https://img.shields.io/npm/v/tinkoff-api-securities)](https://www.npmjs.com/package/tinkoff-api-securities)
![npm bundle size](https://img.shields.io/bundlephobia/min/tinkoff-api-securities)
![NPM](https://img.shields.io/npm/l/tinkoff-api-securities)

Получает список торгуемых на Tinkoff инструментов.

## Установка

Установите пакет при помощи NPM

```bash
npm install tinkoff-api-securities
```

## Пример

```javascript
import { Tinkoff } from 'tinkoff-api-securities';

const main = async () => {
    const API = new Tinkoff('Tinkoff Invest API SandBox token');
    // Список всех торгуемых акций, облигаций, ETF и валют
    const stocks = await API.stocks();
    const bonds = await API.bonds();
    const etfs = await API.etfs();
    const currencies = await API.currencies();

    // Уточнение валюты инструмента
    const stocks_usd = await API.stocks('USD');
};

main();
```

## Возвращаемые значения

```javascript
const stocks = await API.stocks('USD');
console.log(stocks[9].ticker, stocks[9].name);
// CAT Caterpillar
```
