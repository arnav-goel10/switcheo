package types

const (
	// ModuleName defines the module name
	ModuleName = "crudapp"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_crudapp"

	// PostKey defines the key to store the value
	PostKey = "Post/value/"

	// PostCountKey defines the key to store the count
	PostCountKey = "Post/count/"
)

var (
	ParamsKey = []byte("p_crudapp")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
