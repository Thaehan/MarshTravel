# Dự án phần mềm hỗ trợ du lịch MashTravel.
- [Video Demo dự án](https://drive.google.com/file/d/1RnaRbWRJy0pGTg1bNtc2ljX2mmZVNvEW/view)

# Làm việc với các nhánh 🔥:

- main: Là nhánh giới thiệu về sản phẩm, không bao gồm source code.
- staging: Là nhánh build sản phẩm cho tester hoặc người dùng cuối.
- ft/...: Là các nhánh build các chức năng mới sẽ merge vào staging.

# Cài đặt môi trường với dev 🔥:

- Tải xuống và cài đặt JDK 11 [JDK11](https://drive.google.com/file/d/1ZUYx-6dkCT-84FesZvb4cB-AopY8-IdW/view?usp=sharing).
- Ấn phím Windows, gõ env và mở lên Environment Variables, trong tab System Variables chọn New và thêm như hình
  ![image](https://user-images.githubusercontent.com/62579790/221627578-f8642111-ed4a-4267-90dc-1829a1d54248.png).
  ![image](https://user-images.githubusercontent.com/62579790/221627678-367371e7-b9dd-4b9c-9ea3-dd922f41b7b5.png).

- Tải xuống và cài đặt (next \* 3.14) [AndroidStudio](https://developer.android.com/studio).
- Mở Android Studio và chọn như hình để mở SDK Manager.
  <img width="801" alt="image" src="https://user-images.githubusercontent.com/62579790/221621272-0c0a143e-6c6b-46cf-9533-e812593bf24a.png">
  <img width="999" alt="image" src="https://user-images.githubusercontent.com/62579790/221628967-0e94fc1f-219e-4e74-bce7-6e5c40f85455.png">
- Chọn Show package detail góc phải dưới rồi chọn theo các mục lớn như sau:
- Android SDK build tool: 31.0.
- NDK 25.2.xxx.
- Android SDK command-line tool: lastest.
- CMake: Tích hết ạ.
- Ấn OK và chờ install
  <img width="992" alt="image" src="https://user-images.githubusercontent.com/62579790/221629259-e6579082-20cc-45c9-9bd7-9e4c3b2acf85.png">

- Tải xuống và giải nén source code, mở thư mục source code.
- Mở cmd tại thư mục này gõ _yarn install_.

# Hướng dẫn sử dụng các chức năng với package.json 🔥:

- _yarn android_: Chạy ứng dụng debug trên máy ảo hoặc nếu kết nối với máy thật qua dây hoặc wifi debug thì có thể chạy. (Lưu ý: Nếu chạy trên máy ảo thì cần phải tạo máy ảo theo hướng dẫn [Emulator](https://developer.android.com/studio/run/managing-avds).
- _yarn build-apk_: Build file apk.
