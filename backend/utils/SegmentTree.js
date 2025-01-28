
class SegmentTree {
    constructor(l, r, val = 0) {
        this.val = val; this.lazy = 0;
        this.left = this.right = null;
        this.l = l; this.r = r;
    }

    _propagate_lazy() {
        if (this.lazy != 0) {
            this.val += this.lazy
            
            // if not child node, push one deeper
            if (this.l < this.r) {
                let m = (this.l + this.r) >> 1
                this.left = this.left || new SegmentTree(this.l, m, 0)
                this.right = this.right || new SegmentTree(m+1, this.r, 0)
                this.left.lazy += this.lazy;
                this.right.lazy += this.lazy;
            }
            this.lazy = 0;
        }
    }

    query(ql, qr) {
        this._propagate_lazy()

        //total miss
        if (qr < this.l || ql > this.r) return 0 

        //total hit
        if (ql <= this.l && this.r <= qr) {
            return this.val
        }
        
        let m = (this.l + this.r) >> 1
        this.left = this.left || new SegmentTree(this.l, m, 0)
        this.right = this.right || new SegmentTree(m + 1, this.r, 0)
        
        return Math.max(this.left.query(ql, qr), this.right.query(ql, qr))
    }

    update(ql, qr, updateVal = 1) {
        this._propagate_lazy()

        //total miss
        if (qr < this.l || ql > this.r) return

        //total hit
        if (ql <= this.l && this.r <= qr) {
            this.lazy += updateVal
            this._propagate_lazy()
            return
        }

        let m = (this.l + this.r) >> 1
        this.left = this.left || new SegmentTree(this.l, m, 0)
        this.right = this.right || new SegmentTree(m+1, this.r, 0)
        this.left.update(ql, qr, updateVal);
        this.right.update(ql, qr, updateVal)
        this.val = Math.max(this.left.val, this.right.val)
    }
}

export default SegmentTree;