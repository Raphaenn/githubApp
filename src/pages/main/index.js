import React, { Component } from "react";
// ActivityIndicator faz o icon padrão de loading da plataforma
import { Keyboard, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

import api from "../../services/api";
import { Container, Form, SubmitButton, Input, List, User, Avatar, Name, Bio, ProfileButton, ProfileText } from "./styles";

export default class Main extends Component {

  static navigationOptions = {
    title: 'Usuários'
  }

  // validaçao de estruturas que estao sendo usadas
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired
  }

  state = {
    newUser: '',
    users: [],
    loading: false,
  }

  // salvar no localstore similar ao navegador
  async componentDidMount() {
    console.tron.log(this.props)
    const users = await AsyncStorage.getItem('users');

    if(users) {
      this.setState({users: JSON.parse(users)})
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if(prevState.users !== users) {
       AsyncStorage.setItem('users', JSON.stringify(users))
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    }

    this.setState({
      users: [...users, data],
      newUser: "",
      loading: false
    })

    // faz o teclado sumir depois de apertar botão
    Keyboard.dismiss();
  };

  handleNavigate = (user) => {
    const { navigation } = this.props;
    navigation.navigate('User', {user});
  }

  render() {

    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input autoCorrect={false} 
          autoCapitalize="none" 
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={text => this.setState({newUser: text})}
          returnKeyType="send"
          onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton  loadgin={loading} onPress={this.handleAddUser}>
            { loading ? <ActivityIndicator color="#fff"/> : <Icon name="add" size={20} color="#fff" /> }
          </SubmitButton>
        </Form>

        <List 
          data={users}
          keyExtractor={user => user.login}
          // item é uma desestruturacão e vem com os dados do array usuário
          renderItem={({ item }) => (
            <User>
              {/* para mandar um url dentro do source precisa de duas chaves */}
              <Avatar source={{uri: item.avatar}}/>
              <Name>{item.name}</Name>
              <Bio> {item.bio} </Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)} > 
                <ProfileText>Ver Perfil</ProfileText> 
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    )
  }
}

