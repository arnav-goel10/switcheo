package keeper

import (
	"crudapp/x/crudapp/types"
)

var _ types.QueryServer = Keeper{}
