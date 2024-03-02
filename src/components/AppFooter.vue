<script>
export default {
    data() {
        return {
            currentYear: new Date().getFullYear()
        }
    }
}

</script>

<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h4 class="text-center">Links</h4>
                    <ul class="list-unstyled d-flex flex-column align-items-center justify-content-center">
                        <li><a href="privacy.html">Privacy Policy</a></li>
                        <li><a href="terms.html">Terms and Conditions</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="col-md-4 ms_container d-flex flex-column justify-content-center my-3">
                    <h4 class="text-center fs-3">BoolBnB</h4>
                    <h4 class="text-center fs-5">Your Home Away From Home</h4>
                </div>
                <div class="col-md-4">
                    <h4 class="text-center">Follow us</h4>
                    <ul class="social-icons d-flex justify-content-center gap-3 list-unstyled align-items-center">
                        <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                        <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                        <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                        <li><a href="#"><i class="fa-solid fa-b"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bottom-bar mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 my-5">
                        <h4 class="text-center fs-6">&copy; {{ currentYear }} BoolBnB. All rights reserved</h4>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>


<style scoped lang="scss">
footer {
    margin-top: 60px;
    min-height: 200px;
    padding-top: 50px;
    background-color: #d6e9f0;


    ul {
        min-height: 120px;
        border-radius: 20px;
        background-color: #52a3c0;
        a {
            color: black;
            font-size: 1.2rem;
            color: white;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
                color: rgba(17, 24, 126, 0.858);
            }

            i {
                font-size: 2rem;
            
            }
        }
    }

    .bottom-bar {
        background-color: #52a3c0;
            h4 {
            color: white;
        }
    }

}
</style>