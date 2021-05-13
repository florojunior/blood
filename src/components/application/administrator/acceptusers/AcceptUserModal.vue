<template>
  <v-dialog v-model="opened" persistent max-width="600">
    <v-card>
      <v-card-title class="text-subtitle-1 d-flex justify-start pb-6">
          <v-row class="pa-2 ma-0 d-flex justify-start pb-0">
            <v-col cols=12 xl="12" lg="12" md="12" sm="12" class="d-flex justify-space-between">
                <span></span>
                <span class="text-center">{{ userSelected.dados.nome }} </span> 
                <v-btn
                    color="pink"
                    fab
                    dark
                    small
                    @click="cancelAction()"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-col>
            
          </v-row>
          
          
      </v-card-title>

      <v-card-text class="text-body-2">
          <v-form id="form" ref="form">
          <v-row class="d-flex justify-center pa-0 ma-0">
              <v-col class="pa-0 d-flex justify-start" cols="6" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-bold">Genero:</p>
              </v-col>
              <v-col class="pa-0 pl-2" cols="6" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-medium text--disabled">{{gender}}</p>
              </v-col>
              <v-col class="pa-0 d-flex justify-start" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-bold">Telefone:</p>
              </v-col>
              <v-col class="pa-0 pl-2" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-medium text--disabled"> {{userSelected.dados.telefone1}}</p>
              </v-col>
              <v-col class="pa-0 d-flex justify-start" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-bold">CPF:</p>
              </v-col>
              <v-col class="pa-0 pl-2" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-medium text--disabled">{{userSelected.dados.cpf}}</p>
              </v-col>
              <v-col class="pa-0 d-flex justify-start" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-bold">Data de nascimento:</p>
              </v-col>
              <v-col class="pa-0 pl-2" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-medium text--disabled">{{birthday}}</p>
              </v-col>
              <v-col class="pa-0 d-flex justify-start" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-bold">E-mail:</p>
              </v-col>
              <v-col class="pa-0 pl-2" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-medium text--disabled">{{userSelected.dados.login}}</p>
              </v-col>
              <br>
              <v-col class="pa-0 d-flex justify-start" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-bold">Ocupação:</p>
              </v-col>
               <v-col class="pa-0 pl-2"  cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-medium text--disabled">Medico</p>
              </v-col>
              <v-col class="pa-0 d-flex justify-start" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-bold">CRM/COREN:</p>
              </v-col>
               <v-col class="pa-0 pl-2" cols="6" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-medium text--disabled">123123</p>
              </v-col>
              <v-col v-if="userSelected.status == 'pendente'" class="pa-0 d-flex justify-start" cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                  <p class="font-weight-bold">Status</p>
              </v-col>
              
            <v-col v-if="userSelected.status == 'pendente'" class="pa-0 pl-2"  cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                <v-radio-group v-model="statusSelected" class="pa-0 ma-0">
                    <v-radio
                        label="Aceitar"
                        value="T"
                    ></v-radio>
                    <v-radio
                        label="Rejeitar"
                        value="F"
                    ></v-radio>
                </v-radio-group>
            </v-col>
            <v-col v-if="userSelected.status == 'pendente'" class="pa-0 d-flex justify-center" cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
                <v-select
                        v-model="profileSelected"
                        :items="getPorfileslist"
                        :item-text="'descricao'"
                        :item-value="'idperfil'"
                        outlined
                        required
                        :label="`${formLabels.profile}`"
                        :rules="[profileRules.required]"
                        name="hospitalId"
                    ></v-select>
            </v-col>
              
          </v-row>
          </v-form>
      </v-card-text>

      <v-card-actions v-if="userSelected.status == 'pendente'" class="d-flex justify-center ">
        <v-btn type="submit"
            form="form" 
            color="green" 
            tile 
            class="mb-4"
            @click.prevent="confirmAccept()">
            <p class="white--text pa-0 ma-0 mr-6 ml-6">ATUALIZAR CADASTRO</p>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {
    profileRules,
} from '@/validations';

export default {
    
    data:()=>{
        return {
            statusSelected: "T",
            profileSelected: 0,
            profiles: [],
            formLabels:{
                profile: 'Perfil'
            },
            profileRules
        }
    },
    props: {
        userSelected: Object
    },
  computed: {
    ...mapGetters('modal', ['getModalAcceptUsers']),
    ...mapGetters('administration', ['getPorfileslist']),
    opened(){
        return true;
    },
    gender(){
        if(this.userSelected)
            return this.userSelected.dados.sexo == "M" ? "Masculino" : "Feminino"
        else
            return ""
    },
    birthday(){
        const dataNascimento = this.userSelected.dados.datanascimento;
        const year = dataNascimento.substring(0,4);
        const month = dataNascimento.substring(5,7);
        const day = dataNascimento.substring(8,10);
        return `${day}/${month}/${year}`;
    }
  },
  created:function(){
        console.log('Criou');
        this.fetchListProfiles();
    },
  methods: {
    ...mapActions('modal', ['setModalAcceptUsers']),
    ...mapActions('administration', ['fetchListProfiles', 'fetchUpdateUserStatus']),
    cancelAction(){
        this.setModalAcceptUsers("","","", false);
    },
    async confirmAccept(){
        if(this.$refs.form.validate()){
            await this.fetchUpdateUserStatus({
                idUsuario: this.userSelected.idusuario,
                idPerfil: this.profileSelected,
                ativo: this.statusSelected
            });

            this.setModalAcceptUsers("","","", false);
        }
    }
  },
};
</script>

<style>
</style>
