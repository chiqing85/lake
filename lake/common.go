package lake

import (
	"crypto/sha256"
	"fmt"
)

func Sha(s string) string {
	data := []byte(s)
	has := fmt.Sprintf("%x", sha256.Sum256( data ) )
	return has
}