import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($input: ProfileInput!) {
    addProfile(input: $input) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addSkill($profileId: ID!, $skill: String!) {
    addSkill(profileId: $profileId, skill: $skill) {
      _id
      name
    
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
      
    }
  }
`;
