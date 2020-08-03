export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  login: Viewer;
};

export type QueryLoginArgs = {
  input?: Maybe<LoginInput>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Viewer = {
  __typename?: 'Viewer';
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Status;
};

export type MutationRegisterArgs = {
  input?: Maybe<RegisterInput>;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Status = {
  __typename?: 'Status';
  success: Scalars['Boolean'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateUserMutationMutationVariables = Exact<{
  input?: Maybe<RegisterInput>;
}>;

export type CreateUserMutationMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'Status' }
    & Pick<Status, 'success'>
  ) }
);

export type LoginUserQueryQueryVariables = Exact<{
  input?: Maybe<LoginInput>;
}>;

export type LoginUserQueryQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'Viewer' }
    & Pick<Viewer, 'email' | 'username' | 'token'>
  ) }
);
