package crudapp_test

import (
	"testing"

	keepertest "crudapp/testutil/keeper"
	"crudapp/testutil/nullify"
	crudapp "crudapp/x/crudapp/module"
	"crudapp/x/crudapp/types"

	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.CrudappKeeper(t)
	crudapp.InitGenesis(ctx, k, genesisState)
	got := crudapp.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
