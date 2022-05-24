import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  numeric: any;
  timestamp: any;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "ingredients" */
export type Ingredients = {
  __typename?: 'ingredients';
  created_at: Scalars['timestamp'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['bigint'];
  quantity?: Maybe<Scalars['numeric']>;
  recipe_id?: Maybe<Scalars['bigint']>;
  unit?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamp'];
};

/** aggregated selection of "ingredients" */
export type Ingredients_Aggregate = {
  __typename?: 'ingredients_aggregate';
  aggregate?: Maybe<Ingredients_Aggregate_Fields>;
  nodes: Array<Ingredients>;
};

/** aggregate fields of "ingredients" */
export type Ingredients_Aggregate_Fields = {
  __typename?: 'ingredients_aggregate_fields';
  avg?: Maybe<Ingredients_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Ingredients_Max_Fields>;
  min?: Maybe<Ingredients_Min_Fields>;
  stddev?: Maybe<Ingredients_Stddev_Fields>;
  stddev_pop?: Maybe<Ingredients_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Ingredients_Stddev_Samp_Fields>;
  sum?: Maybe<Ingredients_Sum_Fields>;
  var_pop?: Maybe<Ingredients_Var_Pop_Fields>;
  var_samp?: Maybe<Ingredients_Var_Samp_Fields>;
  variance?: Maybe<Ingredients_Variance_Fields>;
};


/** aggregate fields of "ingredients" */
export type Ingredients_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ingredients_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ingredients" */
export type Ingredients_Aggregate_Order_By = {
  avg?: InputMaybe<Ingredients_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Ingredients_Max_Order_By>;
  min?: InputMaybe<Ingredients_Min_Order_By>;
  stddev?: InputMaybe<Ingredients_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Ingredients_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Ingredients_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Ingredients_Sum_Order_By>;
  var_pop?: InputMaybe<Ingredients_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Ingredients_Var_Samp_Order_By>;
  variance?: InputMaybe<Ingredients_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "ingredients" */
export type Ingredients_Arr_Rel_Insert_Input = {
  data: Array<Ingredients_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Ingredients_On_Conflict>;
};

/** aggregate avg on columns */
export type Ingredients_Avg_Fields = {
  __typename?: 'ingredients_avg_fields';
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "ingredients" */
export type Ingredients_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ingredients". All fields are combined with a logical 'AND'. */
export type Ingredients_Bool_Exp = {
  _and?: InputMaybe<Array<Ingredients_Bool_Exp>>;
  _not?: InputMaybe<Ingredients_Bool_Exp>;
  _or?: InputMaybe<Array<Ingredients_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  quantity?: InputMaybe<Numeric_Comparison_Exp>;
  recipe_id?: InputMaybe<Bigint_Comparison_Exp>;
  unit?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "ingredients" */
export enum Ingredients_Constraint {
  /** unique or primary key constraint */
  IngredientsPkey = 'ingredients_pkey'
}

/** input type for incrementing numeric columns in table "ingredients" */
export type Ingredients_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  quantity?: InputMaybe<Scalars['numeric']>;
  recipe_id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "ingredients" */
export type Ingredients_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['bigint']>;
  quantity?: InputMaybe<Scalars['numeric']>;
  recipe_id?: InputMaybe<Scalars['bigint']>;
  unit?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Ingredients_Max_Fields = {
  __typename?: 'ingredients_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  quantity?: Maybe<Scalars['numeric']>;
  recipe_id?: Maybe<Scalars['bigint']>;
  unit?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "ingredients" */
export type Ingredients_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Ingredients_Min_Fields = {
  __typename?: 'ingredients_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  quantity?: Maybe<Scalars['numeric']>;
  recipe_id?: Maybe<Scalars['bigint']>;
  unit?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "ingredients" */
export type Ingredients_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ingredients" */
export type Ingredients_Mutation_Response = {
  __typename?: 'ingredients_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Ingredients>;
};

/** on_conflict condition type for table "ingredients" */
export type Ingredients_On_Conflict = {
  constraint: Ingredients_Constraint;
  update_columns?: Array<Ingredients_Update_Column>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};

/** Ordering options when selecting data from "ingredients". */
export type Ingredients_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ingredients */
export type Ingredients_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "ingredients" */
export enum Ingredients_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  Unit = 'unit',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "ingredients" */
export type Ingredients_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['bigint']>;
  quantity?: InputMaybe<Scalars['numeric']>;
  recipe_id?: InputMaybe<Scalars['bigint']>;
  unit?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type Ingredients_Stddev_Fields = {
  __typename?: 'ingredients_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "ingredients" */
export type Ingredients_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Ingredients_Stddev_Pop_Fields = {
  __typename?: 'ingredients_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "ingredients" */
export type Ingredients_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Ingredients_Stddev_Samp_Fields = {
  __typename?: 'ingredients_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "ingredients" */
export type Ingredients_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Ingredients_Sum_Fields = {
  __typename?: 'ingredients_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  quantity?: Maybe<Scalars['numeric']>;
  recipe_id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "ingredients" */
export type Ingredients_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** update columns of table "ingredients" */
export enum Ingredients_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  Unit = 'unit',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Ingredients_Var_Pop_Fields = {
  __typename?: 'ingredients_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "ingredients" */
export type Ingredients_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Ingredients_Var_Samp_Fields = {
  __typename?: 'ingredients_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "ingredients" */
export type Ingredients_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Ingredients_Variance_Fields = {
  __typename?: 'ingredients_variance_fields';
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "ingredients" */
export type Ingredients_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "ingredients" */
  delete_ingredients?: Maybe<Ingredients_Mutation_Response>;
  /** delete single row from the table: "ingredients" */
  delete_ingredients_by_pk?: Maybe<Ingredients>;
  /** delete data from the table: "recipe_bookmarks" */
  delete_recipe_bookmarks?: Maybe<Recipe_Bookmarks_Mutation_Response>;
  /** delete single row from the table: "recipe_bookmarks" */
  delete_recipe_bookmarks_by_pk?: Maybe<Recipe_Bookmarks>;
  /** delete data from the table: "recipes" */
  delete_recipes?: Maybe<Recipes_Mutation_Response>;
  /** delete single row from the table: "recipes" */
  delete_recipes_by_pk?: Maybe<Recipes>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "ingredients" */
  insert_ingredients?: Maybe<Ingredients_Mutation_Response>;
  /** insert a single row into the table: "ingredients" */
  insert_ingredients_one?: Maybe<Ingredients>;
  /** insert data into the table: "recipe_bookmarks" */
  insert_recipe_bookmarks?: Maybe<Recipe_Bookmarks_Mutation_Response>;
  /** insert a single row into the table: "recipe_bookmarks" */
  insert_recipe_bookmarks_one?: Maybe<Recipe_Bookmarks>;
  /** insert data into the table: "recipes" */
  insert_recipes?: Maybe<Recipes_Mutation_Response>;
  /** insert a single row into the table: "recipes" */
  insert_recipes_one?: Maybe<Recipes>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "ingredients" */
  update_ingredients?: Maybe<Ingredients_Mutation_Response>;
  /** update single row of the table: "ingredients" */
  update_ingredients_by_pk?: Maybe<Ingredients>;
  /** update data of the table: "recipe_bookmarks" */
  update_recipe_bookmarks?: Maybe<Recipe_Bookmarks_Mutation_Response>;
  /** update single row of the table: "recipe_bookmarks" */
  update_recipe_bookmarks_by_pk?: Maybe<Recipe_Bookmarks>;
  /** update data of the table: "recipes" */
  update_recipes?: Maybe<Recipes_Mutation_Response>;
  /** update single row of the table: "recipes" */
  update_recipes_by_pk?: Maybe<Recipes>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_IngredientsArgs = {
  where: Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ingredients_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_BookmarksArgs = {
  where: Recipe_Bookmarks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Bookmarks_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_RecipesArgs = {
  where: Recipes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipes_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootInsert_IngredientsArgs = {
  objects: Array<Ingredients_Insert_Input>;
  on_conflict?: InputMaybe<Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ingredients_OneArgs = {
  object: Ingredients_Insert_Input;
  on_conflict?: InputMaybe<Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_BookmarksArgs = {
  objects: Array<Recipe_Bookmarks_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Bookmarks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Bookmarks_OneArgs = {
  object: Recipe_Bookmarks_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Bookmarks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RecipesArgs = {
  objects: Array<Recipes_Insert_Input>;
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipes_OneArgs = {
  object: Recipes_Insert_Input;
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_IngredientsArgs = {
  _inc?: InputMaybe<Ingredients_Inc_Input>;
  _set?: InputMaybe<Ingredients_Set_Input>;
  where: Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ingredients_By_PkArgs = {
  _inc?: InputMaybe<Ingredients_Inc_Input>;
  _set?: InputMaybe<Ingredients_Set_Input>;
  pk_columns: Ingredients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_BookmarksArgs = {
  _inc?: InputMaybe<Recipe_Bookmarks_Inc_Input>;
  _set?: InputMaybe<Recipe_Bookmarks_Set_Input>;
  where: Recipe_Bookmarks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Bookmarks_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Bookmarks_Inc_Input>;
  _set?: InputMaybe<Recipe_Bookmarks_Set_Input>;
  pk_columns: Recipe_Bookmarks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_RecipesArgs = {
  _inc?: InputMaybe<Recipes_Inc_Input>;
  _set?: InputMaybe<Recipes_Set_Input>;
  where: Recipes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipes_By_PkArgs = {
  _inc?: InputMaybe<Recipes_Inc_Input>;
  _set?: InputMaybe<Recipes_Set_Input>;
  pk_columns: Recipes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  ingredients: Array<Ingredients>;
  /** An aggregate relationship */
  ingredients_aggregate: Ingredients_Aggregate;
  /** fetch data from the table: "ingredients" using primary key columns */
  ingredients_by_pk?: Maybe<Ingredients>;
  /** An array relationship */
  recipe_bookmarks: Array<Recipe_Bookmarks>;
  /** An aggregate relationship */
  recipe_bookmarks_aggregate: Recipe_Bookmarks_Aggregate;
  /** fetch data from the table: "recipe_bookmarks" using primary key columns */
  recipe_bookmarks_by_pk?: Maybe<Recipe_Bookmarks>;
  /** fetch data from the table: "recipes" */
  recipes: Array<Recipes>;
  /** fetch aggregated fields from the table: "recipes" */
  recipes_aggregate: Recipes_Aggregate;
  /** fetch data from the table: "recipes" using primary key columns */
  recipes_by_pk?: Maybe<Recipes>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootIngredientsArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Query_RootIngredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Query_RootIngredients_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootRecipe_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


export type Query_RootRecipe_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


export type Query_RootRecipe_Bookmarks_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootRecipesArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Query_RootRecipes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Query_RootRecipes_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['bigint'];
};

/** columns and relationships of "recipe_bookmarks" */
export type Recipe_Bookmarks = {
  __typename?: 'recipe_bookmarks';
  created_at: Scalars['timestamp'];
  id: Scalars['bigint'];
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['bigint']>;
  updated_at: Scalars['timestamp'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['bigint']>;
};

/** aggregated selection of "recipe_bookmarks" */
export type Recipe_Bookmarks_Aggregate = {
  __typename?: 'recipe_bookmarks_aggregate';
  aggregate?: Maybe<Recipe_Bookmarks_Aggregate_Fields>;
  nodes: Array<Recipe_Bookmarks>;
};

/** aggregate fields of "recipe_bookmarks" */
export type Recipe_Bookmarks_Aggregate_Fields = {
  __typename?: 'recipe_bookmarks_aggregate_fields';
  avg?: Maybe<Recipe_Bookmarks_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Bookmarks_Max_Fields>;
  min?: Maybe<Recipe_Bookmarks_Min_Fields>;
  stddev?: Maybe<Recipe_Bookmarks_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Bookmarks_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Bookmarks_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Bookmarks_Sum_Fields>;
  var_pop?: Maybe<Recipe_Bookmarks_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Bookmarks_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Bookmarks_Variance_Fields>;
};


/** aggregate fields of "recipe_bookmarks" */
export type Recipe_Bookmarks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Bookmarks_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Bookmarks_Max_Order_By>;
  min?: InputMaybe<Recipe_Bookmarks_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Bookmarks_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Bookmarks_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Bookmarks_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Bookmarks_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Bookmarks_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Bookmarks_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Bookmarks_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_bookmarks" */
export type Recipe_Bookmarks_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Bookmarks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Bookmarks_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Bookmarks_Avg_Fields = {
  __typename?: 'recipe_bookmarks_avg_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_bookmarks". All fields are combined with a logical 'AND'. */
export type Recipe_Bookmarks_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Bookmarks_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Bookmarks_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_bookmarks" */
export enum Recipe_Bookmarks_Constraint {
  /** unique or primary key constraint */
  RecipeBookmarksPkey = 'recipe_bookmarks_pkey'
}

/** input type for incrementing numeric columns in table "recipe_bookmarks" */
export type Recipe_Bookmarks_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  recipe_id?: InputMaybe<Scalars['bigint']>;
  user_id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "recipe_bookmarks" */
export type Recipe_Bookmarks_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['bigint']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['bigint']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type Recipe_Bookmarks_Max_Fields = {
  __typename?: 'recipe_bookmarks_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['bigint']>;
  recipe_id?: Maybe<Scalars['bigint']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  user_id?: Maybe<Scalars['bigint']>;
};

/** order by max() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Bookmarks_Min_Fields = {
  __typename?: 'recipe_bookmarks_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['bigint']>;
  recipe_id?: Maybe<Scalars['bigint']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  user_id?: Maybe<Scalars['bigint']>;
};

/** order by min() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_bookmarks" */
export type Recipe_Bookmarks_Mutation_Response = {
  __typename?: 'recipe_bookmarks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Bookmarks>;
};

/** on_conflict condition type for table "recipe_bookmarks" */
export type Recipe_Bookmarks_On_Conflict = {
  constraint: Recipe_Bookmarks_Constraint;
  update_columns?: Array<Recipe_Bookmarks_Update_Column>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_bookmarks". */
export type Recipe_Bookmarks_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_bookmarks */
export type Recipe_Bookmarks_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "recipe_bookmarks" */
export enum Recipe_Bookmarks_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipe_bookmarks" */
export type Recipe_Bookmarks_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['bigint']>;
  recipe_id?: InputMaybe<Scalars['bigint']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type Recipe_Bookmarks_Stddev_Fields = {
  __typename?: 'recipe_bookmarks_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Bookmarks_Stddev_Pop_Fields = {
  __typename?: 'recipe_bookmarks_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Bookmarks_Stddev_Samp_Fields = {
  __typename?: 'recipe_bookmarks_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipe_Bookmarks_Sum_Fields = {
  __typename?: 'recipe_bookmarks_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  recipe_id?: Maybe<Scalars['bigint']>;
  user_id?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_bookmarks" */
export enum Recipe_Bookmarks_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Recipe_Bookmarks_Var_Pop_Fields = {
  __typename?: 'recipe_bookmarks_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Bookmarks_Var_Samp_Fields = {
  __typename?: 'recipe_bookmarks_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Bookmarks_Variance_Fields = {
  __typename?: 'recipe_bookmarks_variance_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipes" */
export type Recipes = {
  __typename?: 'recipes';
  cooking_time?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamp'];
  id: Scalars['bigint'];
  image_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  ingredients: Array<Ingredients>;
  /** An aggregate relationship */
  ingredients_aggregate: Ingredients_Aggregate;
  publisher?: Maybe<Scalars['String']>;
  /** An array relationship */
  recipe_bookmarks: Array<Recipe_Bookmarks>;
  /** An aggregate relationship */
  recipe_bookmarks_aggregate: Recipe_Bookmarks_Aggregate;
  servings?: Maybe<Scalars['Int']>;
  source_url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamp'];
  user_id?: Maybe<Scalars['bigint']>;
};


/** columns and relationships of "recipes" */
export type RecipesIngredientsArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesIngredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};

/** aggregated selection of "recipes" */
export type Recipes_Aggregate = {
  __typename?: 'recipes_aggregate';
  aggregate?: Maybe<Recipes_Aggregate_Fields>;
  nodes: Array<Recipes>;
};

/** aggregate fields of "recipes" */
export type Recipes_Aggregate_Fields = {
  __typename?: 'recipes_aggregate_fields';
  avg?: Maybe<Recipes_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipes_Max_Fields>;
  min?: Maybe<Recipes_Min_Fields>;
  stddev?: Maybe<Recipes_Stddev_Fields>;
  stddev_pop?: Maybe<Recipes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipes_Stddev_Samp_Fields>;
  sum?: Maybe<Recipes_Sum_Fields>;
  var_pop?: Maybe<Recipes_Var_Pop_Fields>;
  var_samp?: Maybe<Recipes_Var_Samp_Fields>;
  variance?: Maybe<Recipes_Variance_Fields>;
};


/** aggregate fields of "recipes" */
export type Recipes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Recipes_Avg_Fields = {
  __typename?: 'recipes_avg_fields';
  id?: Maybe<Scalars['Float']>;
  servings?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "recipes". All fields are combined with a logical 'AND'. */
export type Recipes_Bool_Exp = {
  _and?: InputMaybe<Array<Recipes_Bool_Exp>>;
  _not?: InputMaybe<Recipes_Bool_Exp>;
  _or?: InputMaybe<Array<Recipes_Bool_Exp>>;
  cooking_time?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  ingredients?: InputMaybe<Ingredients_Bool_Exp>;
  publisher?: InputMaybe<String_Comparison_Exp>;
  recipe_bookmarks?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
  servings?: InputMaybe<Int_Comparison_Exp>;
  source_url?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipes" */
export enum Recipes_Constraint {
  /** unique or primary key constraint */
  RecipesPkey = 'recipes_pkey'
}

/** input type for incrementing numeric columns in table "recipes" */
export type Recipes_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  servings?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "recipes" */
export type Recipes_Insert_Input = {
  cooking_time?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['bigint']>;
  image_url?: InputMaybe<Scalars['String']>;
  ingredients?: InputMaybe<Ingredients_Arr_Rel_Insert_Input>;
  publisher?: InputMaybe<Scalars['String']>;
  recipe_bookmarks?: InputMaybe<Recipe_Bookmarks_Arr_Rel_Insert_Input>;
  servings?: InputMaybe<Scalars['Int']>;
  source_url?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type Recipes_Max_Fields = {
  __typename?: 'recipes_max_fields';
  cooking_time?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['bigint']>;
  image_url?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  servings?: Maybe<Scalars['Int']>;
  source_url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  user_id?: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type Recipes_Min_Fields = {
  __typename?: 'recipes_min_fields';
  cooking_time?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['bigint']>;
  image_url?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  servings?: Maybe<Scalars['Int']>;
  source_url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  user_id?: Maybe<Scalars['bigint']>;
};

/** response of any mutation on the table "recipes" */
export type Recipes_Mutation_Response = {
  __typename?: 'recipes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipes>;
};

/** input type for inserting object relation for remote table "recipes" */
export type Recipes_Obj_Rel_Insert_Input = {
  data: Recipes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};

/** on_conflict condition type for table "recipes" */
export type Recipes_On_Conflict = {
  constraint: Recipes_Constraint;
  update_columns?: Array<Recipes_Update_Column>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};

/** Ordering options when selecting data from "recipes". */
export type Recipes_Order_By = {
  cooking_time?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  ingredients_aggregate?: InputMaybe<Ingredients_Aggregate_Order_By>;
  publisher?: InputMaybe<Order_By>;
  recipe_bookmarks_aggregate?: InputMaybe<Recipe_Bookmarks_Aggregate_Order_By>;
  servings?: InputMaybe<Order_By>;
  source_url?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipes */
export type Recipes_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "recipes" */
export enum Recipes_Select_Column {
  /** column name */
  CookingTime = 'cooking_time',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Publisher = 'publisher',
  /** column name */
  Servings = 'servings',
  /** column name */
  SourceUrl = 'source_url',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipes" */
export type Recipes_Set_Input = {
  cooking_time?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['bigint']>;
  image_url?: InputMaybe<Scalars['String']>;
  publisher?: InputMaybe<Scalars['String']>;
  servings?: InputMaybe<Scalars['Int']>;
  source_url?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type Recipes_Stddev_Fields = {
  __typename?: 'recipes_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  servings?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Recipes_Stddev_Pop_Fields = {
  __typename?: 'recipes_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  servings?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Recipes_Stddev_Samp_Fields = {
  __typename?: 'recipes_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  servings?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Recipes_Sum_Fields = {
  __typename?: 'recipes_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  servings?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['bigint']>;
};

/** update columns of table "recipes" */
export enum Recipes_Update_Column {
  /** column name */
  CookingTime = 'cooking_time',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Publisher = 'publisher',
  /** column name */
  Servings = 'servings',
  /** column name */
  SourceUrl = 'source_url',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Recipes_Var_Pop_Fields = {
  __typename?: 'recipes_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  servings?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Recipes_Var_Samp_Fields = {
  __typename?: 'recipes_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  servings?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Recipes_Variance_Fields = {
  __typename?: 'recipes_variance_fields';
  id?: Maybe<Scalars['Float']>;
  servings?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  ingredients: Array<Ingredients>;
  /** An aggregate relationship */
  ingredients_aggregate: Ingredients_Aggregate;
  /** fetch data from the table: "ingredients" using primary key columns */
  ingredients_by_pk?: Maybe<Ingredients>;
  /** An array relationship */
  recipe_bookmarks: Array<Recipe_Bookmarks>;
  /** An aggregate relationship */
  recipe_bookmarks_aggregate: Recipe_Bookmarks_Aggregate;
  /** fetch data from the table: "recipe_bookmarks" using primary key columns */
  recipe_bookmarks_by_pk?: Maybe<Recipe_Bookmarks>;
  /** fetch data from the table: "recipes" */
  recipes: Array<Recipes>;
  /** fetch aggregated fields from the table: "recipes" */
  recipes_aggregate: Recipes_Aggregate;
  /** fetch data from the table: "recipes" using primary key columns */
  recipes_by_pk?: Maybe<Recipes>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootIngredientsArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Subscription_RootIngredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Subscription_RootIngredients_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootRecipe_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


export type Subscription_RootRecipe_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


export type Subscription_RootRecipe_Bookmarks_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootRecipesArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootRecipes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootRecipes_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['bigint'];
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  auth0_id?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamp'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['bigint'];
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  /** An array relationship */
  recipe_bookmarks: Array<Recipe_Bookmarks>;
  /** An aggregate relationship */
  recipe_bookmarks_aggregate: Recipe_Bookmarks_Aggregate;
  updated_at: Scalars['timestamp'];
};


/** columns and relationships of "users" */
export type UsersRecipe_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipe_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg?: Maybe<Users_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
  stddev?: Maybe<Users_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Sum_Fields>;
  var_pop?: Maybe<Users_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Var_Samp_Fields>;
  variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  auth0_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
  recipe_bookmarks?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UniqAuth0User = 'uniq_auth0_user',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  auth0_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['bigint']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  recipe_bookmarks?: InputMaybe<Recipe_Bookmarks_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  auth0_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  auth0_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  auth0_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  recipe_bookmarks_aggregate?: InputMaybe<Recipe_Bookmarks_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Auth0Id = 'auth0_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  auth0_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['bigint']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  id?: Maybe<Scalars['bigint']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Auth0Id = 'auth0_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type BookmarkedRecipesQueryVariables = Exact<{
  searchQuery: Bigint_Comparison_Exp;
}>;


export type BookmarkedRecipesQuery = { __typename?: 'query_root', recipes: Array<{ __typename?: 'recipes', id: any, user_id?: any | null, title?: string | null, publisher?: string | null, image_url?: string | null }> };

export type AddBookmarkMutationVariables = Exact<{
  recipeId: Scalars['bigint'];
}>;


export type AddBookmarkMutation = { __typename?: 'mutation_root', insert_recipe_bookmarks_one?: { __typename?: 'recipe_bookmarks', id: any } | null };

export type DeleteBookmarkMutationVariables = Exact<{
  recipeId: Scalars['bigint'];
}>;


export type DeleteBookmarkMutation = { __typename?: 'mutation_root', delete_recipe_bookmarks?: { __typename?: 'recipe_bookmarks_mutation_response', returning: Array<{ __typename?: 'recipe_bookmarks', id: any }> } | null };

export type RecipeQueryVariables = Exact<{
  id: Scalars['bigint'];
}>;


export type RecipeQuery = { __typename?: 'query_root', recipes_by_pk?: { __typename?: 'recipes', id: any, user_id?: any | null, title?: string | null, publisher?: string | null, source_url?: string | null, image_url?: string | null, servings?: number | null, cooking_time?: string | null, ingredients: Array<{ __typename?: 'ingredients', quantity?: any | null, description?: string | null, unit?: string | null }> } | null };

export type AddRecipeMutationVariables = Exact<{
  recipe: Recipes_Insert_Input;
}>;


export type AddRecipeMutation = { __typename?: 'mutation_root', insert_recipes_one?: { __typename?: 'recipes', id: any } | null };

export type SearchedRecipesQueryVariables = Exact<{
  searchQuery: String_Comparison_Exp;
}>;


export type SearchedRecipesQuery = { __typename?: 'query_root', recipes: Array<{ __typename?: 'recipes', id: any, user_id?: any | null, title?: string | null, publisher?: string | null, image_url?: string | null }> };


export const BookmarkedRecipesDocument = gql`
    query bookmarkedRecipes($searchQuery: bigint_comparison_exp!) {
  recipes(where: {recipe_bookmarks: {user_id: $searchQuery}}) {
    id
    user_id
    title
    publisher
    image_url
  }
}
    `;

/**
 * __useBookmarkedRecipesQuery__
 *
 * To run a query within a React component, call `useBookmarkedRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarkedRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarkedRecipesQuery({
 *   variables: {
 *      searchQuery: // value for 'searchQuery'
 *   },
 * });
 */
export function useBookmarkedRecipesQuery(baseOptions: Apollo.QueryHookOptions<BookmarkedRecipesQuery, BookmarkedRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookmarkedRecipesQuery, BookmarkedRecipesQueryVariables>(BookmarkedRecipesDocument, options);
      }
export function useBookmarkedRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookmarkedRecipesQuery, BookmarkedRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookmarkedRecipesQuery, BookmarkedRecipesQueryVariables>(BookmarkedRecipesDocument, options);
        }
export type BookmarkedRecipesQueryHookResult = ReturnType<typeof useBookmarkedRecipesQuery>;
export type BookmarkedRecipesLazyQueryHookResult = ReturnType<typeof useBookmarkedRecipesLazyQuery>;
export type BookmarkedRecipesQueryResult = Apollo.QueryResult<BookmarkedRecipesQuery, BookmarkedRecipesQueryVariables>;
export const AddBookmarkDocument = gql`
    mutation addBookmark($recipeId: bigint!) {
  insert_recipe_bookmarks_one(object: {recipe_id: $recipeId}) {
    id
  }
}
    `;
export type AddBookmarkMutationFn = Apollo.MutationFunction<AddBookmarkMutation, AddBookmarkMutationVariables>;

/**
 * __useAddBookmarkMutation__
 *
 * To run a mutation, you first call `useAddBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookmarkMutation, { data, loading, error }] = useAddBookmarkMutation({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *   },
 * });
 */
export function useAddBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<AddBookmarkMutation, AddBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBookmarkMutation, AddBookmarkMutationVariables>(AddBookmarkDocument, options);
      }
export type AddBookmarkMutationHookResult = ReturnType<typeof useAddBookmarkMutation>;
export type AddBookmarkMutationResult = Apollo.MutationResult<AddBookmarkMutation>;
export type AddBookmarkMutationOptions = Apollo.BaseMutationOptions<AddBookmarkMutation, AddBookmarkMutationVariables>;
export const DeleteBookmarkDocument = gql`
    mutation deleteBookmark($recipeId: bigint!) {
  delete_recipe_bookmarks(where: {recipe_id: {_eq: $recipeId}}) {
    returning {
      id
    }
  }
}
    `;
export type DeleteBookmarkMutationFn = Apollo.MutationFunction<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>;

/**
 * __useDeleteBookmarkMutation__
 *
 * To run a mutation, you first call `useDeleteBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookmarkMutation, { data, loading, error }] = useDeleteBookmarkMutation({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *   },
 * });
 */
export function useDeleteBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>(DeleteBookmarkDocument, options);
      }
export type DeleteBookmarkMutationHookResult = ReturnType<typeof useDeleteBookmarkMutation>;
export type DeleteBookmarkMutationResult = Apollo.MutationResult<DeleteBookmarkMutation>;
export type DeleteBookmarkMutationOptions = Apollo.BaseMutationOptions<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>;
export const RecipeDocument = gql`
    query Recipe($id: bigint!) {
  recipes_by_pk(id: $id) {
    id
    user_id
    title
    publisher
    source_url
    image_url
    servings
    cooking_time
    ingredients {
      quantity
      description
      unit
    }
  }
}
    `;

/**
 * __useRecipeQuery__
 *
 * To run a query within a React component, call `useRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRecipeQuery(baseOptions: Apollo.QueryHookOptions<RecipeQuery, RecipeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecipeQuery, RecipeQueryVariables>(RecipeDocument, options);
      }
export function useRecipeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipeQuery, RecipeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecipeQuery, RecipeQueryVariables>(RecipeDocument, options);
        }
export type RecipeQueryHookResult = ReturnType<typeof useRecipeQuery>;
export type RecipeLazyQueryHookResult = ReturnType<typeof useRecipeLazyQuery>;
export type RecipeQueryResult = Apollo.QueryResult<RecipeQuery, RecipeQueryVariables>;
export const AddRecipeDocument = gql`
    mutation addRecipe($recipe: recipes_insert_input!) {
  insert_recipes_one(object: $recipe) {
    id
  }
}
    `;
export type AddRecipeMutationFn = Apollo.MutationFunction<AddRecipeMutation, AddRecipeMutationVariables>;

/**
 * __useAddRecipeMutation__
 *
 * To run a mutation, you first call `useAddRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRecipeMutation, { data, loading, error }] = useAddRecipeMutation({
 *   variables: {
 *      recipe: // value for 'recipe'
 *   },
 * });
 */
export function useAddRecipeMutation(baseOptions?: Apollo.MutationHookOptions<AddRecipeMutation, AddRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRecipeMutation, AddRecipeMutationVariables>(AddRecipeDocument, options);
      }
export type AddRecipeMutationHookResult = ReturnType<typeof useAddRecipeMutation>;
export type AddRecipeMutationResult = Apollo.MutationResult<AddRecipeMutation>;
export type AddRecipeMutationOptions = Apollo.BaseMutationOptions<AddRecipeMutation, AddRecipeMutationVariables>;
export const SearchedRecipesDocument = gql`
    query searchedRecipes($searchQuery: String_comparison_exp!) {
  recipes(where: {title: $searchQuery}) {
    id
    user_id
    title
    publisher
    image_url
  }
}
    `;

/**
 * __useSearchedRecipesQuery__
 *
 * To run a query within a React component, call `useSearchedRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchedRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchedRecipesQuery({
 *   variables: {
 *      searchQuery: // value for 'searchQuery'
 *   },
 * });
 */
export function useSearchedRecipesQuery(baseOptions: Apollo.QueryHookOptions<SearchedRecipesQuery, SearchedRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchedRecipesQuery, SearchedRecipesQueryVariables>(SearchedRecipesDocument, options);
      }
export function useSearchedRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchedRecipesQuery, SearchedRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchedRecipesQuery, SearchedRecipesQueryVariables>(SearchedRecipesDocument, options);
        }
export type SearchedRecipesQueryHookResult = ReturnType<typeof useSearchedRecipesQuery>;
export type SearchedRecipesLazyQueryHookResult = ReturnType<typeof useSearchedRecipesLazyQuery>;
export type SearchedRecipesQueryResult = Apollo.QueryResult<SearchedRecipesQuery, SearchedRecipesQueryVariables>;