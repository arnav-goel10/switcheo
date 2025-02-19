package keeper

import (
	"context"
	errorsmod "cosmossdk.io/errors"
	"fmt"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"crudapp/x/crudapp/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) ShowPost(goCtx context.Context, req *types.QueryShowPostRequest) (*types.QueryShowPostResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	post, found := k.GetPost(ctx, req.Id)

	if !found {
		return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("post with id %d not found", req.Id))
	}

	return &types.QueryShowPostResponse{Post: post}, nil
}
