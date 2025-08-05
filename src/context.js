import React from 'react'
// обʼєкт що опіващає зміни всередині себе
// залежним від нього компонентам одиничний експорт...
// саме цей контекст слухають компоненти та роблять ререндер
// коли щось в ньому змінюється
const AppContext = React.createContext({})
export default AppContext
