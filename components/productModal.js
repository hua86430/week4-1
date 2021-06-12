export default
  {
    props: ['productObj', 'url', 'path'],
    data () {
      return {
        imageFileUrl: "",
        innerUrl: '',
        innerPath: "",
      };
    },
    template: `<div
  id="productModal"
  ref="productModal"
  class="modal fade"
  tabindex="-1"
  aria-labelledby="productModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                  <span>新增產品</span>
              </h5>
              <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
              ></button>
          </div>
          <div class="modal-body">
              <div class="row">
                  <div class="col-sm-4">
                      <div class="mb-1">
                          <div class="form-group">
                              <label for="imageUrl">輸入圖片網址</label>
                              <input
                                  type="text"
                                  class="form-control"
                                  placeholder="請輸入圖片連結"
                                  v-model="productObj.imageUrl"
                              >
                          </div>
                          <div class="m-2 d-block text-center">或</div>
                          <label class="d-block btn btn-primary text-black mb-4">
                  <input style="display:none" @change="upload('main',$event)" type="file" class="form-control" id="file" placeholder="新增圖片">
                  <span class="material-icons text-base">
                  file_upload
                  </span>
                  <div class="text-center">新增主要圖片</div>
                          </label>
                          <img class="img-fluid" :src="productObj.imageUrl" alt="">
                      </div>


                      <!--多圖新增 -->
                      <div class="text-secondary mb-2">多圖新增</div>
                      <div v-for="(item, index) in productObj.imagesUrl" :key="index">
                          <input
                              type="text"
                              class="border-0 text-secondary border-bottom border-primary-light bg-light w-100 p-2 mb-2"
                              placeholder="請輸入圖片連結"
                              v-model="productObj.imagesUrl[index]"
                          >
                          
                          <img class="img-fluid mb-2" :src="productObj.imagesUrl[index]">
                      </div>
                      <div v-if="!productObj.imagesUrl.length || productObj.imagesUrl[productObj.imagesUrl.length-1]">
                          <button v-on:click="addImage" class="btn btn-outline-primary btn-sm d-block w-100">
                              新增圖片
                          </button>
                      </div>
                      <div v-else>
                          <button v-on:click="delImage" class="btn btn-outline-danger btn-sm d-block w-100">
                              刪除圖片
                          </button>
                      </div>
                  </div>
                  <div class="col-sm-8">
                      <div class="form-group">
                          <label for="title">標題</label>
                          <input
                              id="title"
                              type="text"
                              class="form-control"
                              placeholder="請輸入標題"
                              v-model.trim="productObj.title"
                          >
                      </div>
                      <div class="row">
                          <div class="form-group col-md-6">
                              <label for="category">分類</label>
                              <input
                                  id="category"
                                  type="text"
                                  class="form-control"
                                  placeholder="請輸入分類"
                                  v-model.trim="productObj.category"
                              >
                          </div>
                          <div class="form-group col-md-6">
                              <label for="price">單位</label>
                              <input
                                  id="unit"
                                  type="text"
                                  class="form-control"
                                  placeholder="請輸入單位"
                                  v-model.trim="productObj.unit"
                              >
                          </div>
                      </div>
                      <div class="row">
                          <div class="form-group col-md-6">
                              <label for="origin_price">原價</label>
                              <input
                                  id="origin_price"
                                  type="number"
                                  min="0"
                                  class="form-control"
                                  placeholder="請輸入原價"
                                  v-model.number="productObj.origin_price"
                              >
                          </div>
                          <div class="form-group col-md-6">
                              <label for="price">售價</label>
                              <input
                                  id="price"
                                  type="number"
                                  min="0"
                                  class="form-control"
                                  placeholder="請輸入售價"
                                  v-model.number="productObj.price"
                              >
                          </div>
                      </div>
                      <hr>
                      <div class="form-group">
                          <label for="description">產品描述</label>
                          <textarea
                              id="description"
                              type="text"
                              class="form-control"
                              placeholder="請輸入產品描述"
                              v-model.trim="productObj.description"
                          ></textarea>
                      </div>
                      <div class="form-group">
                          <label for="content">說明內容</label>
                          <textarea
                              id="description"
                              type="text"
                              class="form-control"
                              placeholder="請輸入說明內容"
                              v-model.trim="productObj.content"
                          ></textarea>
                      </div>
                      <div class="form-group">
                          <div class="form-check">
                              <input
                                  id="is_enabled"
                                  class="form-check-input"
                                  type="checkbox"
                                  :true-value="1"
                                  :false-value="0"
                                  v-model="productObj.is_enabled"
                              >
                              <label class="form-check-label" for="is_enabled">是否啟用</label>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                  取消
              </button>
              <button v-on:click="$emit('edit-product', productObj )" type="button" class="btn btn-primary">
                  確認
              </button>
          </div>
      </div>
  </div>
</div>`,
    methods: {
      upload (key, e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file-to-upload', file);
        axios.post(`${this.innerUrl}api/${this.innerPath}/admin/upload`, formData)
          .then((res) => {
            this.productObj.imageUrl = res.data.imageUrl;
            console.log(res);
          })
          .catch((res) => {
            console.log(res);
          });
      },
      addImage () {
        if (this.productObj.imagesUrl == "") {
          this.productObj.imagesUrl = [];
        }
        if (this.productObj.imagesUrl[this.productObj.imagesUrl.length - 1] !== "")
          this.productObj.imagesUrl.push("");
      },
      delImage () {
        this.productObj.imagesUrl.splice(this.productObj.imagesUrl.length - 1, 1);
      }
    },
    created () {
      this.innerUrl = this.url;
      this.innerPath = this.path;
    }
  }