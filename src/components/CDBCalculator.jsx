import { useState } from 'react';

function CDBCalculator() {
  const [valorInicial, setValorInicial] = useState(1000);
  const [percentualCDI, setPercentualCDI] = useState(110);
  const [prazoMeses, setPrazoMeses] = useState(12);
  const [resultado, setResultado] = useState(null);

  const CDI_ANUAL = 0.13;

  const calcular = () => {
    const taxaMensal = (CDI_ANUAL / 12) * (percentualCDI / 100);
    const montante = valorInicial * Math.pow(1 + taxaMensal, prazoMeses);

    const dias = prazoMeses * 30;
    let ir = 0.225;
    if (dias > 180 && dias <= 360) ir = 0.20;
    else if (dias > 360 && dias <= 720) ir = 0.175;
    else if (dias > 720) ir = 0.15;

    const lucro = montante - valorInicial;
    const imposto = lucro * ir;
    const liquido = montante - imposto;

    setResultado({ montante, imposto, liquido });
  };

  return (
    <div>
      <h2>Calculadora CDB</h2>
      <label>Valor Inicial (R$):</label>
      <input type="number" value={valorInicial} onChange={e => setValorInicial(+e.target.value)} />

      <label>Percentual do CDI (%):</label>
      <input type="number" value={percentualCDI} onChange={e => setPercentualCDI(+e.target.value)} />

      <label>Prazo (meses):</label>
      <input type="number" value={prazoMeses} onChange={e => setPrazoMeses(+e.target.value)} />

      <button onClick={calcular}>Calcular</button>

      {resultado && (
        <div>
          <p>Montante Bruto: R$ {resultado.montante.toFixed(2)}</p>
          <p>Imposto de Renda: R$ {resultado.imposto.toFixed(2)}</p>
          <p>Valor Líquido: R$ {resultado.liquido.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default CDBCalculator;