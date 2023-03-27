import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';

import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  function limpar() {
    setCep('');
    inputRef.current.focus();
  }

  async function buscar() {
    if (cep == '') {
      alert('Digite um cep valido');
      setCep('');
      setCepUser(null);
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); // Garantir que o teclado seja fechado
    } catch (error) {
      console.log('ERROR: ' + error);
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={style.text}>Digite o cep desejado</Text>
        <TextInput
          style={style.input}
          placeholder="Ex: 79003241"
          value={cep}
          onChangeText={texto => setCep(texto)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={style.areaBtn}>
        <TouchableOpacity
          style={[style.botao, {backgroundColor: '#1d75cd'}]}
          onPress={buscar}>
          <Text style={style.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[style.botao, {backgroundColor: '#cd3e1d'}]}
          onPress={limpar}>
          <Text style={style.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && (
        <View style={style.resultado}>
          <Text style={style.itemText}>Cep:{cepUser.cep}</Text>
          <Text style={style.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={style.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={style.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={style.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  botao: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText: {
    fontSize: 22,
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22,
  },
});
