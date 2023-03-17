import React from 'react'

const PostSection = () => {
    return (
        <section class="post-request">
            <div class="post-requset__inner">
                <h1 class="section-title">Working with POST request</h1>
                <div class="mini-container">
                    <div class="input-block">
                        <input type="text" name="name" id="name" placeholder=" " />
                        <label for="name">Your name</label>
                    </div>
                    <div class="input-block">
                        <input type="text" name="email" id="email" placeholder=" " />
                        <label for="email">Email</label>
                    </div>
                    <div class="input-block">
                        <input type="text" name="Phone" id="Phone" placeholder=" " />
                        <label for="Phone">Phone</label>
                    </div>
                    <div class="radio-block">
                        <p>Select your position </p>
                        <div class="radio-item">
                            <input type="radio" name="1" id="1" />
                            <label for="1">Frontend developer</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" name="1" id="2" />
                            <label for="2">Backend developer</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" name="1" id="3" />
                            <label for="3">Designer</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" name="1" id="4" />
                            <label for="4">QA</label>
                        </div>
                    </div>
                    <div class="image-block">
                        <div class="file-upload btn btn-primary">
                            <span>BROWSE</span>
                            <input type="file" name="FileAttachment" id="FileAttachment" class="upload" />
                        </div>
                        <input type="text" id="fileuploadurl" readonly placeholder="Maximum file size is 1GB" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PostSection;